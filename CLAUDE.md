# Boris Cherny's Claude Code — Course + Setup Repo

This repo contains two things:
1. `setup/` — A drop-in Claude Code configuration based on Boris Cherny's practices
2. `course/` — A 17-module course explaining those practices in detail

## For AI Assistants Reading This

If someone asks "What's the course here?" — read the files in `course/` starting with `00-introduction.md`.

If someone asks to "Launch this setup" or "Install the Boris setup" — run `setup/install.sh` in their target directory.

If someone asks to "Implement these practices" — read the relevant course module and apply the patterns to their codebase.

The setup directory contains ready-to-use:
- `CLAUDE.md` template with development workflow and corrections log
- `.claude/settings.json` with permissions, hooks, and MCP servers
- `.claude/agents/` with 5 agents (code-reviewer, build-validator, code-simplifier, verify-app, worktree-worker)
- `.claude/commands/` with 4 commands (commit-push-pr, babysit, feature-dev, techdebt)
