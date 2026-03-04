import { execSync } from 'node:child_process';

const primaryBranch = process.env.TEMPO_PRIMARY_BRANCH ?? 'main';
const isCI = process.env.CI === '1' || process.env.CI === 'true';
const enforceCommitMeta = process.env.TEMPO_ENFORCE_COMMIT_META === '1';

const problems = [];
const notes = [];

const run = (cmd, allowFail = false) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    if (allowFail) {
      return '';
    }
    throw error;
  }
};

if (!run('git rev-parse --is-inside-work-tree', true)) {
  console.log('Git policy check skipped: not inside a git work tree.');
  process.exit(0);
}

const branch = run('git rev-parse --abbrev-ref HEAD', true);
const branchPattern = /^(feat|fix|docs|chore|refactor|test|ci|hotfix)\/c[0-9]{3}-[a-z0-9-]+$/;

if (branch === 'HEAD') {
  notes.push('Detached HEAD detected; branch naming and local-main checks skipped.');
} else if (!isCI) {
  if (branch === primaryBranch && process.env.TEMPO_ALLOW_MAIN !== '1') {
    problems.push(
      `Current branch is '${primaryBranch}'. Create/switch to a feature branch before development work.`,
    );
  } else if (branch !== primaryBranch && !branchPattern.test(branch)) {
    problems.push(
      `Branch '${branch}' does not match required pattern: ${branchPattern.toString()}`,
    );
  }
}

const conventionalSubject =
  /^(feat|fix|docs|chore|refactor|test|ci|build|perf|revert)(\([^)]+\))?: .+/;
const roadmapTrailer = /^Roadmap:\s+ROADMAP\/COMMIT-PLAN\.md#C[0-9]{3}[A-Z]?$/m;
const proposalTrailer =
  /^Proposal:\s+(PROPOSALS\/[0-9]{4}-[0-9]{2}-[0-9]{2}--[a-z0-9-]+\.md|PROPOSALS\/TEMPLATE\.md|N\/A \(T0\))$/m;

const commitsToCheck = [];

if (!isCI && branch && branch !== 'HEAD') {
  const primaryRef = run(`git rev-parse --verify refs/heads/${primaryBranch}`, true);
  if (branch !== primaryBranch && primaryRef) {
    const base = run(`git merge-base HEAD ${primaryBranch}`, true);
    if (base) {
      const revList = run(`git rev-list ${base}..HEAD`, true);
      if (revList) {
        commitsToCheck.push(...revList.split('\n').filter(Boolean));
      }
    }
  }
}

if (commitsToCheck.length === 0 && enforceCommitMeta && !isCI) {
  const head = run('git rev-parse HEAD', true);
  if (head) {
    commitsToCheck.push(head);
  }
}

for (const hash of commitsToCheck) {
  const subject = run(`git show -s --format=%s ${hash}`, true);
  const body = run(`git show -s --format=%b ${hash}`, true);

  const isMergeCommit = subject.startsWith('Merge ');

  if (!isMergeCommit && !conventionalSubject.test(subject)) {
    problems.push(`Commit ${hash.slice(0, 7)} subject is not conventional: "${subject}"`);
  }

  if (!isMergeCommit && !roadmapTrailer.test(body)) {
    problems.push(`Commit ${hash.slice(0, 7)} is missing Roadmap trailer.`);
  }

  if (!isMergeCommit && !proposalTrailer.test(body)) {
    problems.push(`Commit ${hash.slice(0, 7)} is missing Proposal trailer.`);
  }
}

if (commitsToCheck.length === 0) {
  notes.push('No feature-branch commits in scope for metadata checks (merge-base diff is empty).');
}

if (problems.length > 0) {
  console.error('Git policy check failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log('Git policy check passed.');
for (const note of notes) {
  console.log(`- ${note}`);
}
