# Module 06: Git Worktrees

## Why Worktrees?

When you run 5+ Claude sessions in parallel, they all need to modify files. Without isolation, they'll clobber each other's changes.

Git worktrees solve this: each session gets its own copy of the repo, with its own branch, but they all share the same `.git` history.

## Basic Worktree Usage

### Create a worktree manually:
```bash
git worktree add .claude/worktrees/my-feature origin/main
cd .claude/worktrees/my-feature
claude
```

### Use Claude Code's built-in worktree flag:
```bash
claude --worktree my-feature           # Creates worktree and starts session
claude --worktree my-feature --tmux    # In its own tmux session
claude -w my-feature                   # Shorthand
```

### Desktop App:
In the Code tab, check the "worktree" checkbox before starting a session.

## Worktree Organization

```
your-project/
├── .claude/
│   └── worktrees/
│       ├── auth-refactor/      # Worktree 1
│       ├── fix-login-bug/      # Worktree 2
│       ├── update-docs/        # Worktree 3
│       └── api-migration/      # Worktree 4
├── src/
├── tests/
└── CLAUDE.md
```

Each worktree is a full checkout of the repo on its own branch. Changes in one worktree don't affect others.

## Parallel Agents with Worktree Isolation

For batch operations, launch multiple agents each in their own worktree:

```
"Batch up the changes, and launch 10 parallel agents with worktree isolation"
```

Each agent:
1. Gets its own worktree
2. Makes its changes independently
3. Runs tests to verify
4. Creates its own PR

No clobbering. No conflicts.

## Custom Agent with Worktree Isolation

Create an agent that automatically runs in a worktree:

```yaml
# .claude/agents/worktree-worker.md
---
name: worktree-worker
model: haiku
isolation: worktree
---

Your task instructions here...
```

The `isolation: worktree` in frontmatter tells Claude Code to automatically create a worktree for this agent.

## /batch for Large Migrations

The `/batch` command combines worktrees with parallel agents:
```
/batch migrate src/ from Solid to React
```

1. Claude interactively plans the migration with you
2. Fans out work to dozens of worktree agents
3. Each agent works in full isolation
4. Each tests its work before submitting a PR
5. You review and merge

## Non-Git VCS

For Mercurial, Perforce, or SVN, use hooks to define worktree operations:

```json
{
  "hooks": {
    "WorktreeCreate": [{
      "command": "jj workspace add \"$(cat /dev/stdin | jq -r '.name')\""
    }],
    "WorktreeRemove": [{
      "command": "jj workspace forget \"$(cat /dev/stdin | jq -r '.worktree_path')\""
    }]
  }
}
```

## Cleanup

Worktrees are lightweight but take disk space. Clean up finished ones:
```bash
git worktree list           # See all worktrees
git worktree remove <path>  # Remove a finished worktree
git worktree prune          # Clean up stale entries
```
