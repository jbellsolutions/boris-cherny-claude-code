# Module 15: Mobile & Cross-Device

## Mobile App

Claude Code is available on iOS and Android. Boris uses it throughout the day.

### Getting Started
1. Download the Claude app
2. Tap the "Code" tab
3. Start a full Claude Code session from your phone

### Use Cases
- Review changes while away from desk
- Approve PRs from your phone
- Start a task that you'll continue on desktop
- Dispatch quick fixes while on the go
- Monitor long-running sessions

## Cross-Device Workflow

### Teleport
Move sessions between devices seamlessly:
```bash
claude --teleport    # Move current session to/from web
```

**Flow:**
1. Start work in terminal
2. `--teleport` to move to web
3. Continue on phone/tablet
4. `--teleport` back to terminal when at desk

### Remote Control
Enable globally: `/config` → "Enable Remote Control for all sessions"

Once enabled:
- Start sessions from your phone
- Control local sessions from any device
- Dispatch tasks while away from computer

### Cowork Dispatch
Boris's term for dispatching non-coding tasks from mobile:
- Send Slack messages
- Manage files
- Handle emails
- Review PRs

> "When I'm not coding, I'm dispatching."

## Session Handoff Pattern

Boris's typical day:
1. **Morning (desktop)**: Start 5 terminal sessions on major tasks
2. **Meeting break (phone)**: Check progress, dispatch fixes, approve PRs
3. **Afternoon (desktop)**: Review completed work, start new sessions
4. **Evening (phone)**: Monitor overnight tasks, dispatch quick items

## iMessage Integration

With the iMessage plugin:
- Claude shows up as a contact in Messages
- Text Claude from iPhone, iPad, or Mac
- Full Claude Code access via text messages
- Great for quick dispatches

## Tips

- Name your sessions (`claude --name "auth-fix"`) for easy identification on mobile
- Use `/color` to visually distinguish sessions
- Enable notifications so you get pinged on task completion
- Keep mobile prompts short and directive — "fix the failing test" not a long spec
