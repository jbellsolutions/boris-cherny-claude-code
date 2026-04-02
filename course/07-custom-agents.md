# Module 07: Custom Agents

## What Agents Are

Agents are specialized Claude instances with their own system prompts, tool sets, and permissions. They live in `.claude/agents/` as markdown files.

## Boris's Agent Team

### code-simplifier.md
Runs after implementation to clean up code — find duplications, remove dead code, ensure CLAUDE.md compliance.

### build-validator.md
Runs typecheck, lint, tests, and build in sequence. Reports PASS/FAIL for each.

### code-reviewer.md
Multi-agent code review. Spawns subagents to check logic errors, security, performance, style, and edge cases in parallel. Then runs a second pass to challenge the findings.

### verify-app.md
End-to-end application verification — build, tests, smoke tests, regression checks.

### worktree-worker.md
Isolated worker for parallel batch operations. Runs in its own worktree.

## Creating Your Own Agent

Drop a `.md` file in `.claude/agents/`:

```markdown
---
name: my-agent
description: What this agent does
model: opus          # or haiku, sonnet
isolation: worktree  # optional: auto-create worktree
---

Your agent's system prompt and instructions here.
Tell it what to do, what to check, and how to report results.
```

## Agent Configuration Options

In the frontmatter, you can set:
- **name**: Display name
- **model**: Which Claude model to use (opus, sonnet, haiku)
- **isolation**: Set to `worktree` for automatic worktree isolation
- **description**: One-line description shown in agent list
- Custom tool permissions (allow/disallow specific tools)
- Permission mode override

## Launching Agents

```bash
claude --agent code-reviewer        # Launch specific agent
claude --agent worktree-worker      # Launch in worktree
```

Or from within a session: "Use the code-reviewer agent to review these changes"

## Subagent Pattern

Boris uses 5 subagents in parallel to explore codebases quickly. The code-reviewer agent spawns multiple subagents, each checking a different concern:

1. Subagent 1: Logic errors
2. Subagent 2: Security vulnerabilities
3. Subagent 3: Performance issues
4. Subagent 4: Style compliance
5. Subagent 5: Edge cases

Then 5 more subagents challenge the findings from the first pass.

## Default Agent

Set a default agent for your project in settings.json:
```json
{
  "agent": "my-default-agent"
}
```

Or launch with `--agent` flag.

## Permission Routing

Use a hook to route permission requests to Opus for automatic scan and approval:

```json
{
  "hooks": {
    "PermissionRequest": [{
      "hooks": [{
        "type": "command",
        "command": "your-approval-script.sh"
      }]
    }]
  }
}
```

## File Organization

```
.claude/
├── agents/
│   ├── build-validator.md
│   ├── code-architect.md
│   ├── code-reviewer.md
│   ├── code-simplifier.md
│   ├── oncall-guide.md
│   ├── verify-app.md
│   └── worktree-worker.md
```
