import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const requiredNodeRange = pkg.engines?.node ?? '>=20.0.0';
const packageManager = pkg.packageManager ?? 'pnpm@9.0.0';
const requiredPnpmVersion = packageManager.split('@')[1] ?? '9.0.0';

const problems = [];

const getMajor = (version) => Number.parseInt(version.split('.')[0], 10);

const requiredNodeMajor = getMajor(
  requiredNodeRange.replace(/[^0-9.]/g, '').split('.')[0] + '.0.0',
);
const currentNodeVersion = process.versions.node;
if (getMajor(currentNodeVersion) < requiredNodeMajor) {
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
  if (getMajor(currentPnpmVersion) !== getMajor(requiredPnpmVersion)) {
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
