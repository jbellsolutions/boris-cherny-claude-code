# Module 05: Parallel Sessions

## Boris's Setup

Boris runs **10-15 Claude sessions simultaneously**:
- **5 terminal sessions** in iTerm2, numbered tabs 1-5
- **5-10 web sessions** on claude.ai
- **Multiple phone sessions** throughout the day

This is the single biggest productivity unlock after verification.

## Terminal Setup

### Tab Organization
Number your tabs 1-5. Each tab runs one Claude session on a different task:
- Tab 1: Main feature work
- Tab 2: Bug fix
- Tab 3: Code review
- Tab 4: Documentation
- Tab 5: Exploration/research

### System Notifications
Enable iTerm2 system notifications so you get pinged when:
- A session finishes its work
- A session needs your input
- A session hits an error

In Claude Code: `/config` → enable notifications

### Color Coding
Use `/color` to give each session a different prompt color for visual distinction.

## Session Portability

### Teleport Between Devices
```bash
claude --teleport    # Move session to/from web
```

Start work in the terminal, hand it off to the browser, pick it up on your phone, then teleport it back to your terminal.

### Remote Control
Enable in `/config`: "Enable Remote Control for all sessions"
- Start sessions from your phone
- Dispatch tasks while away from your computer
- Monitor progress from any device

### Session Forking
```bash
claude --resume <session-id> --fork-session    # Fork from CLI
```
Or use `/branch` within a session to create a branched conversation.

## Web Sessions

Boris runs 5-10 additional sessions on claude.ai alongside his terminal sessions. Use cases:
- Longer-running tasks that don't need terminal
- Research and exploration
- Tasks you want to monitor from any device

## The Dispatch Mindset

> "When I'm not coding, I'm dispatching."
> — Boris Cherny

Boris treats his sessions like a team:
1. Open a session
2. Give it a clear task
3. Move to the next session
4. Come back when it pings you
5. Review, approve, move on

This turns you from a single-threaded developer into a manager of parallel workstreams.

## Shell Aliases for Quick Navigation

Set up shell aliases for fast worktree switching:
```bash
alias za="cd .claude/worktrees/a && claude"
alias zb="cd .claude/worktrees/b && claude"
alias zc="cd .claude/worktrees/c && claude"
```

Or use tmux with one tab per task.
