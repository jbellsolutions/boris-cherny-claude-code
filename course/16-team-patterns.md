# Module 16: Team Patterns

## Shared CLAUDE.md

The most impactful team practice: a single CLAUDE.md checked into git, maintained by the whole team.

### Process
1. Everyone commits corrections and conventions to CLAUDE.md
2. Review CLAUDE.md changes like code — they affect every session
3. Use the `@.claude` GitHub Action to auto-capture learnings from PRs
4. Ruthlessly edit over time — remove stale entries, consolidate duplicates

### What to Share
- Build/test/lint commands
- Coding conventions
- Corrections (what Claude gets wrong in this codebase)
- Architecture decisions
- Common gotchas

## Shared Settings

Check `.claude/settings.json` into git:
```json
{
  "permissions": {
    "allow": ["Bash(bun run test:*)", "Edit(/src/**)"]
  },
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{"type": "command", "command": "bun run format || true"}]
    }]
  },
  "mcpServers": {
    "slack": {"type": "http", "url": "https://slack.mcp.anthropic.com/mcp"}
  }
}
```

Everyone gets the same:
- Pre-allowed permissions (no per-person setup)
- Auto-formatting hooks
- MCP server access
- Agent and command definitions

## Shared Agents & Commands

Check `.claude/agents/` and `.claude/commands/` into git:
```
.claude/
├── agents/
│   ├── code-reviewer.md
│   ├── build-validator.md
│   └── verify-app.md
├── commands/
│   ├── commit-push-pr.md
│   ├── babysit.md
│   └── feature-dev.md
└── settings.json
```

New team members get the full setup just by cloning the repo.

## Team Plugin Marketplace

Create a company-wide plugin marketplace:
- Teams publish their best agents and commands
- Other teams browse and install with `/plugin`
- Best practices spread organically across the org

## Two-Claude Review Pattern

For critical code:
1. **Developer's Claude** implements the feature
2. **Reviewer's Claude** (separate session) reviews as staff engineer

Neither Claude has seen the other's work, so the review is genuinely independent.

## Scaling Patterns

### Per-Team Agents
Each team creates agents for their domain:
- Frontend team: `ui-reviewer.md`, `accessibility-checker.md`
- Backend team: `api-reviewer.md`, `migration-checker.md`
- Infra team: `deploy-validator.md`, `config-checker.md`

### Slack Integration for Team Sync
- Every morning summary of top posts
- Auto-create PRs from Slack bug reports
- Sync 7 days of Slack, GDrive, Asana, GitHub into a context dump

### Notes Directory
One team member maintains notes per task/project:
```
notes/
├── auth-refactor/
│   ├── decisions.md
│   └── gotchas.md
├── api-migration/
│   └── learnings.md
```

CLAUDE.md points to these for project-specific context.

## Onboarding New Team Members

With this setup checked into git, onboarding is:
1. Clone the repo
2. Run `./setup/install.sh`
3. Start Claude Code
4. Everything works — agents, commands, permissions, MCP servers, CLAUDE.md
