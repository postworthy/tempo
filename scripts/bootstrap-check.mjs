import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const requiredNodeRange = pkg.engines?.node ?? '>=20.0.0';
const packageManager = pkg.packageManager ?? 'pnpm@9.0.0';
const requiredPnpmVersion = packageManager.split('@')[1] ?? '9.0.0';

const problems = [];

const versionParts = (version) => {
  const match = version.match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  return match
    ? [Number(match[1]), Number(match[2] ?? 0), Number(match[3] ?? 0)]
    : [Number.NaN, Number.NaN, Number.NaN];
};

const compareVersions = (left, right) => {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index];
    }
  }
  return 0;
};

const requiredNodeMinimum = versionParts(requiredNodeRange);
const currentNodeVersion = process.versions.node;
if (compareVersions(versionParts(currentNodeVersion), requiredNodeMinimum) < 0) {
  problems.push(
    `Node.js ${requiredNodeRange} required, found ${currentNodeVersion}. Update Node.js and rerun bootstrap.`,
  );
}

let currentPnpmVersion = '';
try {
  currentPnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
} catch {
  problems.push(`pnpm ${requiredPnpmVersion}+ required but not found in PATH.`);
}

if (currentPnpmVersion) {
  if (versionParts(currentPnpmVersion)[0] !== versionParts(requiredPnpmVersion)[0]) {
    problems.push(
      `pnpm major version mismatch. Required ${requiredPnpmVersion}, found ${currentPnpmVersion}.`,
    );
  }
}

if (problems.length > 0) {
  console.error('Bootstrap preflight failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log('Bootstrap preflight passed.');
console.log(`- Node.js: ${currentNodeVersion}`);
console.log(`- pnpm: ${currentPnpmVersion}`);
