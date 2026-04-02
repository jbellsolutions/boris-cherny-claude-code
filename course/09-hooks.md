# Module 09: Hooks

## What Hooks Are

Hooks are shell commands that run deterministically in response to events in Claude Code. Unlike prompts (which are suggestions), hooks **always execute** — they're code, not requests.

## Hook Events

### SessionStart
Runs when Claude Code launches. Use for dynamic context loading:
```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "cat context/current-sprint.md"
      }]
    }]
  }
}
```

### PreToolUse
Runs before Claude uses a tool. Use for logging or validation:
```json
{
  "hooks": {
    "PreToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "echo \"$(date): $TOOL_NAME\" >> ~/.claude/tool-log.txt"
      }]
    }]
  }
}
```

### PostToolUse
Runs after Claude uses a tool. Boris's primary use — auto-format after every edit:
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "bun run format || true"
      }]
    }]
  }
}
```

### PermissionRequest
Runs when Claude asks for permission. Route to Slack/WhatsApp for remote approval:
```json
{
  "hooks": {
    "PermissionRequest": [{
      "hooks": [{
        "type": "command",
        "command": "send-to-slack.sh 'Claude wants to: $PERMISSION_DETAILS'"
      }]
    }]
  }
}
```

### Stop
Runs when Claude reaches the end of its turn. Use to poke Claude to keep going:
```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "check-if-done.sh"
      }]
    }]
  }
}
```

### PostCompact
Fires after context compression. Re-inject critical instructions lost during compaction:
```json
{
  "hooks": {
    "PostCompact": [{
      "hooks": [{
        "type": "command",
        "command": "cat CLAUDE.md"
      }]
    }]
  }
}
```

### WorktreeCreate / WorktreeRemove
Define custom worktree logic for non-Git version control:
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

## Matcher Syntax

The `matcher` field filters which tool triggers the hook:
- `"Write|Edit"` — matches Write or Edit tools
- `"Bash"` — matches Bash tool only
- Omit matcher to run on every tool use

## Configuration Location

Hooks go in `.claude/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": [...],
    "SessionStart": [...],
    "Stop": [...]
  }
}
```

Check this into git so the whole team benefits.

## Key Insight

Hooks are deterministic. They always run. This makes them ideal for:
- Formatting (don't rely on Claude remembering to format)
- Logging (track what Claude is doing)
- Safety (validate before destructive operations)
- Context (re-inject critical info after compaction)

Use hooks for things that must happen. Use prompts for things you'd like to happen.
