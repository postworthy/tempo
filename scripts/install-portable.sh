#!/usr/bin/env bash
set -euo pipefail

SOURCE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET=""
VERIFY_COMMAND=""

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET="${2:-}"
      shift 2
      ;;
    --verify-command)
      VERIFY_COMMAND="${2:-}"
      shift 2
      ;;
    *)
      echo "[tempo adopt] Unknown argument: $1"
      exit 1
      ;;
  esac
done

if [[ -z "$TARGET" || -z "$VERIFY_COMMAND" ]]; then
  echo "[tempo adopt] --target and --verify-command are required."
  exit 1
fi

if [[ "$VERIFY_COMMAND" == *$'\n'* ]]; then
  echo "[tempo adopt] --verify-command must be one line."
  exit 1
fi

if [[ ! -d "$TARGET" ]]; then
  echo "[tempo adopt] Target directory does not exist: $TARGET"
  exit 1
fi

TARGET_ROOT="$(cd "$TARGET" && pwd)"
if [[ "$TARGET_ROOT" == "$SOURCE_ROOT" ]]; then
  echo "[tempo adopt] Target must be a different repository from the Tempo source."
  exit 1
fi

if ! git -C "$TARGET_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[tempo adopt] Target must already be a git repository: $TARGET_ROOT"
  exit 1
fi

TEMPO_ROOT="$TARGET_ROOT/.tempo"
MANIFEST_TMP="$TARGET_ROOT/.tempo-install-manifest.tmp"
MANIFEST_SORTED="$TARGET_ROOT/.tempo-install-manifest.sorted"
mkdir -p "$TEMPO_ROOT"
: >"$MANIFEST_TMP"

cleanup() {
  rm -f "$MANIFEST_TMP" "$MANIFEST_SORTED" "$TEMPO_ROOT/.value.tmp"
}
trap cleanup EXIT

record_path() {
  printf '%s\n' "$1" >>"$MANIFEST_TMP"
}

install_file() {
  local source="$1"
  local destination="$2"
  local relative_destination="${destination#"$TARGET_ROOT"/}"

  if [[ -L "$destination" ]]; then
    echo "[tempo adopt] Conflict: symbolic-link destination is not overwritten: $relative_destination"
    exit 1
  fi

  mkdir -p "$(dirname "$destination")"
  if [[ -e "$destination" ]]; then
    if cmp -s "$source" "$destination"; then
      echo "[tempo adopt] unchanged $relative_destination"
    else
      echo "[tempo adopt] Conflict: existing file differs: $relative_destination"
      exit 1
    fi
  else
    cp "$source" "$destination"
    echo "[tempo adopt] created $relative_destination"
  fi
  record_path "$relative_destination"
}

install_value() {
  local value="$1"
  local destination="$2"
  local relative_destination="${destination#"$TARGET_ROOT"/}"
  local temporary="$TEMPO_ROOT/.value.tmp"

  printf '%s\n' "$value" >"$temporary"
  install_file "$temporary" "$destination"
  rm -f "$temporary"
  record_path "$relative_destination"
}

install_file "$SOURCE_ROOT/portable/KERNEL.md" "$TEMPO_ROOT/KERNEL.md"
install_file "$SOURCE_ROOT/portable/VERIFY.md" "$TEMPO_ROOT/VERIFY.md"
install_file "$SOURCE_ROOT/portable/README.md" "$TEMPO_ROOT/README.md"
install_file "$SOURCE_ROOT/CONSTITUTION.md" "$TEMPO_ROOT/CONSTITUTION.md"
install_value "$VERIFY_COMMAND" "$TEMPO_ROOT/VERIFY_COMMAND"

install_file "$SOURCE_ROOT/portable/PROJECT-BRIEF.md" "$TEMPO_ROOT/templates/PROJECT-BRIEF.md"
install_file "$SOURCE_ROOT/portable/SPEC.md" "$TEMPO_ROOT/templates/SPEC.md"
install_file "$SOURCE_ROOT/PROPOSALS/TEMPLATE.md" "$TEMPO_ROOT/templates/PROPOSAL.md"
install_file "$SOURCE_ROOT/REVIEWS/TEMPLATE.md" "$TEMPO_ROOT/templates/REVIEW.md"
install_file "$SOURCE_ROOT/RCA/TEMPLATE.md" "$TEMPO_ROOT/templates/RCA.md"
install_file "$SOURCE_ROOT/GOALS/TEMPLATE.md" "$TEMPO_ROOT/templates/GOAL.md"
install_file "$SOURCE_ROOT/portable/GOALS-README.md" "$TARGET_ROOT/GOALS/README.md"
install_file "$SOURCE_ROOT/GOALS/TEMPLATE.md" "$TARGET_ROOT/GOALS/TEMPLATE.md"

while IFS= read -r source; do
  relative_source="${source#"$SOURCE_ROOT"/}"
  install_file "$source" "$TARGET_ROOT/$relative_source"
done < <(find "$SOURCE_ROOT/.agents/skills" -type f -print | sort)

AGENTS_PATH="$TARGET_ROOT/AGENTS.md"
AGENTS_START="<!-- tempo-kernel:start -->"
AGENTS_END="<!-- tempo-kernel:end -->"

if [[ -e "$AGENTS_PATH" ]] && ! grep -Fq "$AGENTS_START" "$AGENTS_PATH"; then
  mkdir -p "$TEMPO_ROOT/backups"
  if [[ ! -e "$TEMPO_ROOT/backups/AGENTS.md.before-tempo" ]]; then
    cp "$AGENTS_PATH" "$TEMPO_ROOT/backups/AGENTS.md.before-tempo"
    echo "[tempo adopt] backed up AGENTS.md"
  fi
fi

if [[ ! -e "$AGENTS_PATH" ]]; then
  : >"$AGENTS_PATH"
  echo "[tempo adopt] created AGENTS.md"
fi

if ! grep -Fq "$AGENTS_START" "$AGENTS_PATH"; then
  {
    printf '\n%s\n' "$AGENTS_START"
    printf '## Tempo\n\n'
    printf 'Read `.tempo/KERNEL.md` before repository work and use the repo-local Tempo skill matching the task.\n'
    printf '%s\n' "$AGENTS_END"
  } >>"$AGENTS_PATH"
  echo "[tempo adopt] added Tempo routing to AGENTS.md"
else
  if ! grep -Fq "$AGENTS_END" "$AGENTS_PATH"; then
    echo "[tempo adopt] Conflict: AGENTS.md has an incomplete Tempo routing block."
    exit 1
  fi
  echo "[tempo adopt] unchanged AGENTS.md routing"
fi
record_path "AGENTS.md (marked routing block)"

sort -u "$MANIFEST_TMP" >"$MANIFEST_SORTED"
if [[ -e "$TEMPO_ROOT/install-manifest.txt" ]] &&
  ! cmp -s "$MANIFEST_SORTED" "$TEMPO_ROOT/install-manifest.txt"; then
  echo "[tempo adopt] Conflict: existing Tempo install manifest differs."
  exit 1
fi
cp "$MANIFEST_SORTED" "$TEMPO_ROOT/install-manifest.txt"

echo "[tempo adopt] Portable Tempo installation complete."
echo "[tempo adopt] Canonical target verification: $VERIFY_COMMAND"
echo "[tempo adopt] Next: ask your agent to read AGENTS.md and use tempo-onboard-project."
