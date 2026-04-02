#!/bin/bash
# Boris Cherny's Claude Code Setup — Installer
# Copies the setup into your project or globally into ~/.claude/
#
# Usage:
#   ./install.sh              # Install into current project (.claude/ + CLAUDE.md)
#   ./install.sh --global     # Install globally into ~/.claude/
#   ./install.sh /path/to/dir # Install into a specific directory

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET=""
MODE="project"

if [ "$1" = "--global" ]; then
    TARGET="$HOME"
    MODE="global"
elif [ -n "$1" ]; then
    TARGET="$1"
else
    TARGET="$(pwd)"
fi

echo "==================================================="
echo "  Boris Cherny's Claude Code Setup — Installer"
echo "==================================================="
echo ""
echo "Mode: $MODE"
echo "Target: $TARGET"
echo ""

# Create .claude directory structure
mkdir -p "$TARGET/.claude/agents"
mkdir -p "$TARGET/.claude/commands"

# Copy agents
echo "Installing agents..."
for agent in "$SCRIPT_DIR/.claude/agents/"*.md; do
    filename=$(basename "$agent")
    if [ -f "$TARGET/.claude/agents/$filename" ]; then
        echo "  [SKIP] agents/$filename (already exists)"
    else
        cp "$agent" "$TARGET/.claude/agents/$filename"
        echo "  [OK]   agents/$filename"
    fi
done

# Copy commands
echo "Installing commands..."
for cmd in "$SCRIPT_DIR/.claude/commands/"*.md; do
    filename=$(basename "$cmd")
    if [ -f "$TARGET/.claude/commands/$filename" ]; then
        echo "  [SKIP] commands/$filename (already exists)"
    else
        cp "$cmd" "$TARGET/.claude/commands/$filename"
        echo "  [OK]   commands/$filename"
    fi
done

# Copy settings.json (merge if exists)
if [ -f "$TARGET/.claude/settings.json" ]; then
    echo ""
    echo "[WARN] .claude/settings.json already exists."
    echo "       Review $SCRIPT_DIR/.claude/settings.json and merge manually."
else
    cp "$SCRIPT_DIR/.claude/settings.json" "$TARGET/.claude/settings.json"
    echo ""
    echo "[OK]   .claude/settings.json"
fi

# Copy CLAUDE.md (only for project mode, don't overwrite)
if [ "$MODE" = "project" ]; then
    if [ -f "$TARGET/CLAUDE.md" ]; then
        echo ""
        echo "[WARN] CLAUDE.md already exists at $TARGET/CLAUDE.md"
        echo "       Review $SCRIPT_DIR/CLAUDE.md and merge manually."
    else
        cp "$SCRIPT_DIR/CLAUDE.md" "$TARGET/CLAUDE.md"
        echo "[OK]   CLAUDE.md"
    fi
fi

echo ""
echo "==================================================="
echo "  Installation complete!"
echo "==================================================="
echo ""
echo "Next steps:"
echo "  1. Review and customize CLAUDE.md for your project"
echo "  2. Review .claude/settings.json — update permissions for your build tool"
echo "  3. Add your MCP servers to .claude/settings.json"
echo "  4. Commit the .claude/ directory and CLAUDE.md to git"
echo ""
echo "Quick start:"
echo "  claude                          # Start a session"
echo "  claude --agent code-reviewer    # Launch code review agent"
echo "  claude -w my-feature            # Start in a worktree"
echo ""
echo "See the course/ directory for the full training on these practices."
