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

STAGING_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/tempo-adopt.XXXXXX")"
MANIFEST_STAGED="$STAGING_ROOT/install-manifest.txt"
AGENTS_ORIGINAL="$STAGING_ROOT/AGENTS.md.original"
SUCCESS=0
CREATED_FILES=()

cleanup() {
  local path
  if [[ "$SUCCESS" -ne 1 ]]; then
    if [[ -f "$AGENTS_ORIGINAL" && -f "$TARGET_ROOT/AGENTS.md" ]]; then
      cp "$AGENTS_ORIGINAL" "$TARGET_ROOT/AGENTS.md"
    fi
    for ((index = ${#CREATED_FILES[@]} - 1; index >= 0; index -= 1)); do
      path="${CREATED_FILES[$index]}"
      rm -f "$path"
    done
  fi
  rm -rf "$STAGING_ROOT"
}
trap cleanup EXIT

MANAGED_PATHS=()

stage_file() {
  local source="$1"
  local relative_destination="$2"
  local staged="$STAGING_ROOT/files/$relative_destination"

  mkdir -p "$(dirname "$staged")"
  cp "$source" "$staged"
  MANAGED_PATHS+=("$relative_destination")
}

stage_file "$SOURCE_ROOT/portable/KERNEL.md" ".tempo/KERNEL.md"
stage_file "$SOURCE_ROOT/portable/VERIFY.md" ".tempo/VERIFY.md"
stage_file "$SOURCE_ROOT/portable/README.md" ".tempo/README.md"
stage_file "$SOURCE_ROOT/portable/CONSTITUTION.md" ".tempo/CONSTITUTION.md"
mkdir -p "$STAGING_ROOT/files/.tempo"
printf '%s\n' "$VERIFY_COMMAND" >"$STAGING_ROOT/files/.tempo/VERIFY_COMMAND"
MANAGED_PATHS+=(".tempo/VERIFY_COMMAND")

stage_file "$SOURCE_ROOT/portable/PROJECT-BRIEF.md" ".tempo/templates/PROJECT-BRIEF.md"
stage_file "$SOURCE_ROOT/portable/SPEC.md" ".tempo/templates/SPEC.md"
stage_file "$SOURCE_ROOT/PROPOSALS/TEMPLATE.md" ".tempo/templates/PROPOSAL.md"
stage_file "$SOURCE_ROOT/REVIEWS/TEMPLATE.md" ".tempo/templates/REVIEW.md"
stage_file "$SOURCE_ROOT/RCA/TEMPLATE.md" ".tempo/templates/RCA.md"
stage_file "$SOURCE_ROOT/GOALS/TEMPLATE.md" ".tempo/templates/GOAL.md"
stage_file "$SOURCE_ROOT/portable/GOALS-README.md" "GOALS/README.md"
stage_file "$SOURCE_ROOT/GOALS/TEMPLATE.md" "GOALS/TEMPLATE.md"

while IFS= read -r source; do
  relative_source="${source#"$SOURCE_ROOT"/}"
  stage_file "$source" "$relative_source"
done < <(find "$SOURCE_ROOT/.agents/skills" -type f -print | sort)

{
  printf '%s\n' "${MANAGED_PATHS[@]}"
  printf '%s\n' "AGENTS.md (marked routing block)"
} | sort -u >"$MANIFEST_STAGED"

reject_symlink_components() {
  local relative_path="$1"
  local current="$TARGET_ROOT"
  local component
  local components=()
  local index

  IFS='/' read -r -a components <<<"$relative_path"
  for ((index = 0; index < ${#components[@]}; index += 1)); do
    component="${components[$index]}"
    current="$current/$component"
    if [[ -L "$current" ]]; then
      echo "[tempo adopt] Conflict: symbolic link is not allowed in managed path: $relative_path"
      return 1
    fi
    if [[ "$index" -lt $((${#components[@]} - 1)) && -e "$current" && ! -d "$current" ]]; then
      echo "[tempo adopt] Conflict: managed parent is not a directory: $relative_path"
      return 1
    fi
  done
}

preflight_file() {
  local relative_destination="$1"
  local source="$STAGING_ROOT/files/$relative_destination"
  local destination="$TARGET_ROOT/$relative_destination"

  reject_symlink_components "$relative_destination"
  if [[ -e "$destination" ]]; then
    if [[ ! -f "$destination" ]]; then
      echo "[tempo adopt] Conflict: managed destination is not a regular file: $relative_destination"
      return 1
    fi
    if ! cmp -s "$source" "$destination"; then
      echo "[tempo adopt] Conflict: existing file differs: $relative_destination"
      return 1
    fi
  fi
}

for relative_destination in "${MANAGED_PATHS[@]}"; do
  preflight_file "$relative_destination"
done

reject_symlink_components ".tempo/install-manifest.txt"
if [[ -e "$TARGET_ROOT/.tempo/install-manifest.txt" ]] &&
  ! cmp -s "$MANIFEST_STAGED" "$TARGET_ROOT/.tempo/install-manifest.txt"; then
  echo "[tempo adopt] Conflict: existing Tempo install manifest differs."
  exit 1
fi

AGENTS_PATH="$TARGET_ROOT/AGENTS.md"
AGENTS_BACKUP="$TARGET_ROOT/.tempo/backups/AGENTS.md.before-tempo"
AGENTS_START="<!-- tempo-kernel:start -->"
AGENTS_END="<!-- tempo-kernel:end -->"
AGENTS_EXISTED=0

reject_symlink_components "AGENTS.md"
reject_symlink_components ".tempo/backups/AGENTS.md.before-tempo"

if [[ -e "$AGENTS_PATH" && ! -f "$AGENTS_PATH" ]]; then
  echo "[tempo adopt] Conflict: AGENTS.md is not a regular file."
  exit 1
fi
if [[ -f "$AGENTS_PATH" ]]; then
  AGENTS_EXISTED=1
fi

START_COUNT=0
END_COUNT=0
if [[ -f "$AGENTS_PATH" ]]; then
  START_COUNT="$(grep -Fc "$AGENTS_START" "$AGENTS_PATH" || true)"
  END_COUNT="$(grep -Fc "$AGENTS_END" "$AGENTS_PATH" || true)"
fi
if [[ "$START_COUNT" -ne "$END_COUNT" || "$START_COUNT" -gt 1 ]]; then
  echo "[tempo adopt] Conflict: AGENTS.md has an incomplete or duplicated Tempo routing block."
  exit 1
fi

if [[ "$START_COUNT" -eq 0 && -e "$AGENTS_BACKUP" ]]; then
  if [[ ! -f "$AGENTS_BACKUP" ]] || ! cmp -s "$AGENTS_PATH" "$AGENTS_BACKUP"; then
    echo "[tempo adopt] Conflict: existing AGENTS.md backup does not match the current file."
    exit 1
  fi
fi

install_staged_file() {
  local relative_destination="$1"
  local source="$STAGING_ROOT/files/$relative_destination"
  local destination="$TARGET_ROOT/$relative_destination"

  if [[ -e "$destination" ]]; then
    echo "[tempo adopt] unchanged $relative_destination"
    return
  fi

  mkdir -p "$(dirname "$destination")"
  cp "$source" "$destination"
  CREATED_FILES+=("$destination")
  echo "[tempo adopt] created $relative_destination"
}

for relative_destination in "${MANAGED_PATHS[@]}"; do
  install_staged_file "$relative_destination"
done

if [[ -f "$AGENTS_PATH" ]]; then
  cp "$AGENTS_PATH" "$AGENTS_ORIGINAL"
else
  : >"$AGENTS_PATH"
  CREATED_FILES+=("$AGENTS_PATH")
  echo "[tempo adopt] created AGENTS.md"
fi

if [[ "$START_COUNT" -eq 0 ]]; then
  if [[ "$AGENTS_EXISTED" -eq 1 && ! -e "$AGENTS_BACKUP" ]]; then
    mkdir -p "$(dirname "$AGENTS_BACKUP")"
    cp "$AGENTS_PATH" "$AGENTS_BACKUP"
    CREATED_FILES+=("$AGENTS_BACKUP")
    echo "[tempo adopt] backed up AGENTS.md"
  fi
  {
    printf '\n%s\n' "$AGENTS_START"
    printf '## Tempo\n\n'
    printf 'Read `.tempo/KERNEL.md` before repository work and use the repo-local Tempo skill matching the task.\n'
    printf '%s\n' "$AGENTS_END"
  } >>"$AGENTS_PATH"
  echo "[tempo adopt] added Tempo routing to AGENTS.md"
else
  echo "[tempo adopt] unchanged AGENTS.md routing"
fi

if [[ -e "$TARGET_ROOT/.tempo/install-manifest.txt" ]]; then
  echo "[tempo adopt] unchanged .tempo/install-manifest.txt"
else
  cp "$MANIFEST_STAGED" "$TARGET_ROOT/.tempo/install-manifest.txt"
  CREATED_FILES+=("$TARGET_ROOT/.tempo/install-manifest.txt")
  echo "[tempo adopt] created .tempo/install-manifest.txt"
fi

SUCCESS=1
echo "[tempo adopt] Portable Tempo installation complete."
echo "[tempo adopt] Canonical target verification: $VERIFY_COMMAND"
echo "[tempo adopt] Next: ask your agent to read AGENTS.md and use tempo-onboard-project."
