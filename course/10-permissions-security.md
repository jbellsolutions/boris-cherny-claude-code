# Module 10: Permissions & Security

## The Pre-Allow Pattern

Instead of using `--dangerously-skip-permissions`, Boris pre-allows specific safe commands using `/permissions`:

```json
{
  "permissions": {
    "allow": [
      "Bash(bq query:*)",
      "Bash(bun run build:*)",
      "Bash(bun run lint:file:*)",
      "Bash(bun run test:*)",
      "Bash(bun run typecheck:*)",
      "Bash(find:*)",
      "Bash(gh issue view:*)",
      "Bash(gh pr checks:*)",
      "Bash(gh pr comment:*)",
      "Bash(gh pr diff:*)",
      "Bash(gh pr list:*)",
      "Edit(/src/**)",
      "Edit(/tests/**)",
      "Edit(/docs/**)"
    ]
  }
}
```

### Why This Matters
- Saves you from clicking "allow" hundreds of times per session
- Still blocks potentially dangerous operations (rm, git push, etc.)
- Wildcard syntax (`*`) matches any suffix
- Path patterns restrict edits to safe directories

### How to Configure
1. Use `/permissions` in a session to add pre-allowed commands interactively
2. Or edit `.claude/settings.json` directly
3. Check into git so the team shares the same permissions

## Auto Mode

Claude Code has built-in safety classifiers that evaluate each action:
- **Safe operations** (reading files, running tests) → auto-approved
- **Risky operations** (deleting files, pushing code) → still flagged for approval

This gives you a middle ground between clicking allow on everything and skipping permissions entirely.

## Sandboxing

Run Claude Code with file and network isolation:

```bash
claude --sandbox           # Enable sandbox
```

Or use `/sandbox` within a session.

Sandbox mode:
- Restricts file access to the project directory
- Limits network access
- Reduces permission prompts (since dangerous operations are blocked at the OS level)

### Sandbox + Auto-Allow
For long-running unattended tasks:
```bash
claude --permission-mode=dontAsk    # Auto-approve in sandboxed environment
```

This is safe because the sandbox prevents destructive operations at the OS level.

## When to Skip Permissions

Only use `--dangerously-skip-permissions` for:
- Long-running unattended tasks in sandboxed environments
- CI/CD pipelines with limited scope
- Trusted automated workflows

Never use it on your main development machine without sandboxing.

## Enterprise Policies

For teams, settings.json supports enterprise-wide policies:
- Codebase-wide settings (checked into repo)
- Personal overrides (in `~/.claude/`)
- Enterprise-wide policies (managed centrally)

Policies can enforce minimum permission levels across the organization.
