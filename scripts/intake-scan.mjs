import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
let modeOnly = false;
let write = false;
let outputPath = 'DISCOVERY/PROJECT-INVENTORY.md';

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--mode-only') {
    modeOnly = true;
    continue;
  }

  if (arg === '--write') {
    write = true;
    const next = args[i + 1];
    if (next && !next.startsWith('--')) {
      outputPath = next;
      i += 1;
    }
    continue;
  }

  if (arg.startsWith('--write=')) {
    write = true;
    outputPath = arg.slice('--write='.length) || outputPath;
    continue;
  }

  if (arg === '--help' || arg === '-h') {
    console.log('Usage: node scripts/intake-scan.mjs [--mode-only] [--write [path]]');
    process.exit(0);
  }
}

const ignoredDirs = new Set([
  '.git',
  'node_modules',
  'dist',
  '.pnpm-store',
  '.template-init-backup',
  'coverage',
  'build',
  'out',
  '.next',
  '.turbo',
  '.cache',
  'target',
  'vendor',
]);

const codeExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.py',
  '.go',
  '.rs',
  '.java',
  '.kt',
  '.cs',
  '.rb',
  '.php',
  '.swift',
  '.scala',
]);

const likelyCodeRoots = [
  'src',
  'app',
  'apps',
  'packages',
  'services',
  'server',
  'backend',
  'lib',
  'cmd',
  'test',
];

const fileExists = (p) => existsSync(p);

const readText = (p) => {
  if (!fileExists(p)) {
    return '';
  }

  try {
    return readFileSync(p, 'utf8');
  } catch {
    return '';
  }
};

const walk = (dir, accumulator, depth = 0) => {
  if (!fileExists(dir)) {
    return;
  }

  if (depth > 8 || accumulator.length > 20000) {
    return;
  }

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) {
        continue;
      }
      walk(entryPath, accumulator, depth + 1);
      continue;
    }

    if (entry.isFile()) {
      accumulator.push(entryPath);
    }
  }
};

const codeFiles = [];
for (const root of likelyCodeRoots) {
  walk(root, codeFiles);
}

const sourceFileCount = codeFiles.filter((file) => codeExtensions.has(path.extname(file))).length;

const listTopLevelDirs = () => {
  const dirs = [];
  for (const entry of readdirSync('.', { withFileTypes: true })) {
    if (entry.isDirectory() && !ignoredDirs.has(entry.name) && !entry.name.startsWith('.')) {
      dirs.push(entry.name);
    }
  }
  return dirs.sort();
};

const topLevelDirs = listTopLevelDirs();

const packageJsonRaw = readText('package.json');
let packageData = {};
if (packageJsonRaw) {
  try {
    packageData = JSON.parse(packageJsonRaw);
  } catch {
    packageData = {};
  }
}

const dependenciesCount = Object.keys(packageData.dependencies ?? {}).length;
const devDependenciesCount = Object.keys(packageData.devDependencies ?? {}).length;
const scriptNames = Object.keys(packageData.scripts ?? {});

const projectBriefText = readText('PROJECT-BRIEF.md');
const projectBriefIsUnfilled = projectBriefText.includes('Status: UNFILLED');

const specText = readText('SPEC.md');
const specPlaceholderCount = (specText.match(/<[^>]+>/g) ?? []).length;

const countNonTemplateRecords = (dir) => {
  if (!fileExists(dir)) {
    return 0;
  }

  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .filter((name) => name !== 'TEMPLATE.md').length;
};

const nonTemplateRecords = {
  proposals: countNonTemplateRecords('PROPOSALS'),
  reviews: countNonTemplateRecords('REVIEWS'),
  rca: countNonTemplateRecords('RCA'),
};

const frameworkSignals = [];
if (fileExists('next.config.js') || fileExists('next.config.ts')) frameworkSignals.push('Next.js');
if (fileExists('vite.config.ts') || fileExists('vite.config.js')) frameworkSignals.push('Vite');
if (fileExists('nuxt.config.ts') || fileExists('nuxt.config.js')) frameworkSignals.push('Nuxt');
if (fileExists('angular.json')) frameworkSignals.push('Angular');
if (fileExists('Cargo.toml')) frameworkSignals.push('Rust/Cargo');
if (fileExists('go.mod')) frameworkSignals.push('Go modules');
if (fileExists('pom.xml')) frameworkSignals.push('Maven/Java');
if (fileExists('pyproject.toml') || fileExists('requirements.txt')) frameworkSignals.push('Python');
if (fileExists('Gemfile')) frameworkSignals.push('Ruby/Bundler');
if (fileExists('docker-compose.yml') || fileExists('docker-compose.yaml'))
  frameworkSignals.push('Docker Compose');
if (packageJsonRaw) frameworkSignals.push('Node package.json');

const gitCommitCount = (() => {
  try {
    return Number.parseInt(execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim(), 10);
  } catch {
    return 0;
  }
})();

const reasons = [];
let score = 0;

if (!projectBriefIsUnfilled) {
  reasons.push('PROJECT-BRIEF appears filled (not template baseline).');
  score += 4;
}

if (nonTemplateRecords.proposals + nonTemplateRecords.reviews + nonTemplateRecords.rca > 0) {
  reasons.push('Governance folders contain non-template records.');
  score += 4;
}

if (sourceFileCount >= 20) {
  reasons.push(`Code file count suggests existing implementation (${sourceFileCount} files).`);
  score += 2;
}

if (sourceFileCount >= 80) {
  reasons.push('Code file count indicates mature codebase footprint.');
  score += 1;
}

if (specPlaceholderCount <= 3 && specText.trim().length > 0) {
  reasons.push('SPEC appears mostly concrete (few placeholder tokens).');
  score += 2;
}

if (packageData.name && packageData.name !== 'tempo-template') {
  reasons.push(`package.json name differs from template baseline (${packageData.name}).`);
  score += 1;
}

if (dependenciesCount + devDependenciesCount >= 20) {
  reasons.push('Dependency footprint is larger than starter baseline.');
  score += 1;
}

if (frameworkSignals.length >= 3) {
  reasons.push('Multiple framework/runtime signals detected.');
  score += 1;
}

if (gitCommitCount >= 50) {
  reasons.push('Substantial git history detected.');
  score += 1;
}

const recommendedMode = score >= 4 ? 'adopt-existing' : 'greenfield';

const riskAreas = [];
if (sourceFileCount > 0 && !scriptNames.includes('verify')) {
  riskAreas.push('No canonical verify script detected in package scripts.');
}
if (nonTemplateRecords.proposals + nonTemplateRecords.reviews + nonTemplateRecords.rca > 0) {
  riskAreas.push(
    'Existing governance records may need migration/alignment with Tempo conventions.',
  );
}
if (frameworkSignals.length === 0) {
  riskAreas.push('Stack could not be inferred reliably from common manifest files.');
}
if (projectBriefIsUnfilled && recommendedMode === 'adopt-existing') {
  riskAreas.push('Project intent appears undocumented despite existing implementation.');
}

const hypotheses = [
  `Primary runtime/tooling likely includes: ${frameworkSignals.length > 0 ? frameworkSignals.join(', ') : 'unknown stack'}.`,
  `Repository currently has approximately ${sourceFileCount} source-like files across likely code roots.`,
  `Verification posture appears ${scriptNames.includes('verify') ? 'scripted (verify present)' : 'partially/undocumented (verify missing)'}.`,
];

const deltaQuestions = [
  'Which inferred workflows are truly production-critical versus legacy or unused?',
  'What backward-compatibility constraints are mandatory for the next changes?',
  'What pain points are not visible from code/tests (team process, incidents, support load)?',
  'Which unfinished areas are intentionally deferred versus accidentally incomplete?',
  'Which security/privacy/compliance constraints are known but not encoded?',
  'What would define success for the first Tempo-guided change in this repo?',
];

const markdown = [
  '# PROJECT-INVENTORY',
  '',
  `Generated: ${new Date().toISOString()}`,
  `Recommended onboarding mode: ${recommendedMode}`,
  '',
  '## Mode Recommendation Evidence',
  '',
  ...(reasons.length > 0
    ? reasons.map((reason) => `- ${reason}`)
    : ['- No strong existing-project signals detected.']),
  '',
  '## Repository Signals',
  '',
  `- Project brief status: ${projectBriefIsUnfilled ? 'UNFILLED (template-like)' : 'FILLED/UPDATED'}`,
  `- SPEC placeholder count: ${specPlaceholderCount}`,
  `- Non-template records: proposals=${nonTemplateRecords.proposals}, reviews=${nonTemplateRecords.reviews}, rca=${nonTemplateRecords.rca}`,
  `- Source-like file count: ${sourceFileCount}`,
  `- Git commit count: ${gitCommitCount}`,
  `- Top-level directories: ${topLevelDirs.join(', ') || '(none detected)'}`,
  '',
  '## Inferred Stack and Tooling',
  '',
  ...(frameworkSignals.length > 0
    ? frameworkSignals.map((signal) => `- ${signal}`)
    : ['- Unknown (no standard manifests found)']),
  '',
  '## Verification Signals',
  '',
  `- package scripts: ${scriptNames.join(', ') || '(none detected)'}`,
  `- dependency counts: dependencies=${dependenciesCount}, devDependencies=${devDependenciesCount}`,
  '',
  '## Hypotheses to Confirm',
  '',
  ...hypotheses.map((item) => `- ${item}`),
  '',
  '## Risk Areas and Unknowns',
  '',
  ...(riskAreas.length > 0
    ? riskAreas.map((item) => `- ${item}`)
    : ['- No immediate high-risk signals detected by static scan.']),
  '',
  '## Delta Intake Questions',
  '',
  ...deltaQuestions.map((question, index) => `${index + 1}. ${question}`),
  '',
].join('\n');

if (modeOnly) {
  process.stdout.write(recommendedMode);
  process.exit(0);
}

if (write) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${markdown}\n`, 'utf8');
  console.log(`[intake-scan] Wrote ${outputPath}`);
  console.log(`[intake-scan] Recommended mode: ${recommendedMode}`);
  process.exit(0);
}

console.log(markdown);
