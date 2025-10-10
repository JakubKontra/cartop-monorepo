#!/bin/bash

# Print color
YELLOW='\033[1;33m'

ROOT_DIR="$(dirname "$0")/.."
APPS_DIR="$ROOT_DIR/apps"
PACKAGES_DIR="$ROOT_DIR/packages"

run_lint_in_children() {
  local dir="$1"
  if [[ -d "$dir" ]]; then
    for child in "$dir"/*/; do
      local name
      name=$(basename "$child")
      if [[ -f "$child/package.json" ]]; then
        if grep -q '"lint":' "$child/package.json"; then
          echo -e "${YELLOW}[$name] Running lint..."
          (cd "$child" && yarn lint)
          echo -e "${YELLOW}[$name] Lint finished."
        else
          echo -e "${YELLOW}[$name] No lint script. Skipping..."
        fi
      fi
    done
  fi
}

run_lint_in_children "$APPS_DIR"
run_lint_in_children "$PACKAGES_DIR"
