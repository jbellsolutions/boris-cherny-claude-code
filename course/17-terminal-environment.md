# Module 17: Terminal & Environment Setup

## Recommended Terminal: Ghostty

Boris recommends Ghostty for Claude Code:
- Synchronized rendering (no flicker)
- 24-bit color support
- Proper Unicode support

These matter because Claude Code uses rich terminal formatting — without proper support, output looks broken.

## Status Line

Customize the status bar below the composer with `/statusline`:

```
[Opus] my-app | feature/auth █████████░░░░░░░░░ 42% | $0.08 | 7m 3s
```

Shows: model, directory, git branch, context usage, cost, time elapsed.

## Terminal Tab Setup

Boris's layout:
- **Tab 1-5**: Claude Code sessions (numbered for quick switching)
- **Color-coded**: Each tab/session has a different color (`/color`)
- **Named**: Each session named for its task (`claude --name "task"`)
- **Notifications**: System notifications for completion/input needed

## Tmux Integration

Use tmux for one tab per task:
```bash
claude --worktree my-feature --tmux    # Launch in own tmux session
```

## Keyboard Customization

Remap any keybinding with `/keybindings`:
- Settings live-reload immediately
- No restart needed
- Lives in `~/.claude/keybindings.json`

### Shift+Enter for Newlines
In some terminals, Shift+Enter doesn't work. Fix with:
```
/terminal-setup
```

Supports: IDE terminals, Apple Terminal, Warp, Alacritty.

## Vim Mode

Enable vim keybindings:
```
/vim
```

## Voice Input

Boris advocates voice over typing — it's 3x faster and prompts become more detailed:

### Options
1. **Claude Code built-in**: `/voice` → hold spacebar to dictate
2. **macOS system**: Press `fn` twice for dictation
3. **Desktop app**: Click the voice button
4. **iOS**: Enable dictation in settings

### Why Voice Works Better
When you type, you abbreviate. When you speak, you naturally provide more detail:
- Typing: "add auth"
- Speaking: "I need JWT-based authentication with refresh tokens, storing them in httpOnly cookies, with rate limiting on the login endpoint"

The extra detail produces dramatically better output.

## Theme Configuration

Set light/dark theme via `/config`:
- Light theme for daytime
- Dark theme for nighttime
- Follows system preference

## Output Styles

Configure how Claude communicates:
- **Explanatory**: Explains the reasoning behind changes
- **Learning**: Coaches you to make changes yourself
- **Custom**: Define your own communication style

Set via `/config`.

## Custom Spinner

Customize the loading spinner verbs in settings.json:
```json
{
  "spinnerVerbs": ["Engaging warp drive", "Scanning sector", "Hailing frequency"]
}
```

Or stick with the Star Trek theme Boris enjoys.

## Environment Variables

settings.json supports custom env vars:
```json
{
  "env": {
    "DATABASE_URL": "postgres://...",
    "API_KEY": "..."
  }
}
```

84+ built-in environment variables are supported.

## Quick Reference

| Command | What It Does |
|---------|-------------|
| `/config` | Theme, notifications, output styles |
| `/statusline` | Customize status bar |
| `/keybindings` | Remap keys |
| `/terminal-setup` | Fix Shift+Enter in terminals |
| `/vim` | Enable vim mode |
| `/voice` | Voice input mode |
| `/color` | Change prompt color |
| `/model` | Switch model/effort level |
