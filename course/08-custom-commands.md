# Module 08: Custom Commands (Slash Commands)

## What Custom Commands Are

Custom commands are slash commands you create by dropping `.md` files in `.claude/commands/`. Type `/command-name` in any session to trigger them.

## Boris's Commands

### /commit-push-pr
Commits staged changes, pushes, and opens a PR. One command replaces a multi-step git workflow.

### /babysit
Auto-addresses code review comments, auto-rebases, and shepherds PRs to merge. Run it on a loop:
```
/loop 5m /babysit
```

### /slack-feedback
Auto-creates PRs for Slack feedback every 30 minutes:
```
/loop 30m /slack-feedback
```

### /post-merge-sweeper
Goes through recently merged PRs and addresses any code review comments that were missed.

### /pr-pruner
Closes stale or unnecessary PRs:
```
/loop 1h /pr-pruner
```

### /techdebt
Finds duplicated code across the codebase and proposes consolidation.

### /feature-dev
Boris's planning-first feature development workflow (see Module 02):
1. Specification → 2. Planning → 3. Review → 4. Implementation → 5. Verification → 6. Simplification

## Creating Custom Commands

Create a `.md` file in `.claude/commands/`:

```markdown
# .claude/commands/my-command.md

Description of what this command does.

Steps:
1. First thing to do
2. Second thing to do
3. How to verify
```

Now type `/my-command` in any session.

## Command with Arguments

Commands can accept `$ARGUMENTS`:

```markdown
# .claude/commands/fix-issue.md

Fix the GitHub issue: $ARGUMENTS

1. Read the issue with `gh issue view $ARGUMENTS`
2. Understand the bug
3. Implement the fix
4. Run tests
5. Create a PR referencing the issue
```

Usage: `/fix-issue 123`

## Team Commands

Check your commands into git so the whole team benefits:
```
.claude/
└── commands/
    ├── commit-push-pr.md
    ├── babysit.md
    ├── feature-dev.md
    ├── techdebt.md
    └── team-specific-workflow.md
```

## /btw — Side Queries

`/btw` is a built-in command for quick side questions without interrupting the current task:
```
/btw what's the difference between useMemo and useCallback?
```

Claude answers without losing context of what it was doing. Full context, no tool calls.

## /simplify — Parallel Code Quality

Built-in command that spawns parallel agents to:
- Review your changes for code reuse opportunities
- Check quality and efficiency
- Ensure CLAUDE.md compliance

Run it after every implementation.
