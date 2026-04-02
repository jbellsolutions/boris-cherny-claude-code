# Module 11: MCP Integrations

## What MCP Is

MCP (Model Context Protocol) servers give Claude access to external tools and services. Boris uses them to eliminate context switching.

## Boris's MCP Setup

### Slack MCP
```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.anthropic.com/mcp"
    }
  }
}
```

**Use cases:**
- Paste a Slack bug thread and say "fix" — zero context switching
- Daily summaries of top posts you're tagged in
- `/loop 30m /slack-feedback` — auto-create PRs from Slack feedback
- Search and post to Slack channels

### BigQuery
Boris uses the `bq` CLI directly in Claude Code with a BigQuery skill checked into the codebase:

> "I haven't written a line of SQL in 6+ months"

**Use cases:**
- Run analytics queries in natural language
- Pull metrics on the fly
- Autonomous `bq` queries without writing SQL
- Shared across the team via the skill file

### Sentry
Grab error logs directly from Sentry without leaving Claude Code:
- "What are the top errors in production this week?"
- "Show me the stack trace for this Sentry issue"

### GitHub Action
Install with `/install-github-action`:
- Adds `@.claude` PR integration
- Team members tag PRs with learnings
- Auto-updates CLAUDE.md from PR comments

### iMessage Plugin
Text Claude from any Apple device:
- Shows up as a contact in Messages
- Works from iPhone, iPad, Mac
- Full Claude Code access via text

## Configuring MCP Servers

Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "service-name": {
      "type": "http",
      "url": "https://service.mcp.example.com/mcp"
    }
  }
}
```

Or use `/plugin` to browse and install MCP servers interactively.

## The Zero-Context-Switching Pattern

Boris's workflow with MCP:
1. Bug reported in Slack → paste thread → "fix"
2. Need data → "how many users signed up this week?" → BigQuery query runs automatically
3. Error in production → Sentry MCP pulls the stack trace → Claude investigates
4. PR ready → GitHub MCP creates it → Slack MCP posts update

You never leave Claude Code. Everything comes to you.

## Database Flexibility

MCP works with any database that has:
- A CLI tool (BigQuery bq, psql, mysql)
- An MCP server
- An API

Configure whichever your project uses.
