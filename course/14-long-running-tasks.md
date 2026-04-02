# Module 14: Long-Running & Scheduled Tasks

## /loop — Local Recurring Tasks

Run a command on a recurring interval, up to 3 days:

```
/loop 5m /babysit          # Address review comments every 5 min
/loop 30m /slack-feedback   # Create PRs from Slack feedback every 30 min
/loop 1h /pr-pruner         # Close stale PRs every hour
```

### Use Cases
- **PR shepherding**: `/loop 5m /babysit` — auto-rebase, address comments, push
- **Feedback loop**: `/loop 30m /slack-feedback` — turn Slack feedback into PRs
- **Cleanup**: `/loop 1h /pr-pruner` — close stale/unnecessary PRs
- **Post-merge**: `/post-merge-sweeper` — catch missed review comments
- **Build monitoring**: `/loop 10m check CI status and fix failures`

### Limitation
/loop runs locally — if you close your laptop, it stops.

## /schedule — Cloud Recurring Jobs

For tasks that must survive laptop closure, use `/schedule`:

```
/schedule daily "Update docs based on shipped PRs and message #docs-update"
```

/schedule creates cloud-based recurring jobs that run on Anthropic's infrastructure.

### Use Cases
- Daily documentation updates based on shipped PRs
- Automated Slack summaries
- Replace cron jobs with Claude-powered automation
- Monitoring and alerting

## Unattended Long-Running Tasks

For tasks that run for hours without input:

### Option 1: Stop Hook
Use a Stop hook to poke Claude to keep going:
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

### Option 2: Prompt Continuation
Tell Claude: "Prompt me with a background agent when you're done verifying"

### Option 3: Sandboxed Auto-Approve
For trusted workflows:
```bash
claude --permission-mode=dontAsk    # In sandboxed environment
```

### Option 4: Web Sessions
Start the task on claude.ai web — it runs in the cloud, survives laptop closure, and you can check from any device.

## Cloud Environment Setup Scripts

For Desktop/Web cloud environments, add a setup script that runs before Claude Code launches:

```bash
#!/bin/bash
yarn install
```

Configure in Desktop/Web settings. Skipped when resuming existing sessions.
