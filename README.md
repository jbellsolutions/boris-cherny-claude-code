# Boris Cherny's Claude Code — Course + Setup

Based on the practices of Boris Cherny, creator of Claude Code at Anthropic. This repo has two parts:

## 1. `setup/` — The Actionable Setup

Drop-in Claude Code configuration with Boris's agents, commands, hooks, permissions, and CLAUDE.md.

### Quick Install

```bash
# Install into your current project
cd your-project
./path/to/setup/install.sh

# Or install globally
./path/to/setup/install.sh --global

# Or install into a specific directory
./path/to/setup/install.sh /path/to/project
```

### What Gets Installed

```
your-project/
├── CLAUDE.md                          # Development workflow + corrections log
└── .claude/
    ├── settings.json                  # Permissions, hooks, MCP servers
    ├── agents/
    │   ├── build-validator.md         # Validates builds, tests, types
    │   ├── code-reviewer.md           # Multi-agent code review
    │   ├── code-simplifier.md         # Post-implementation cleanup
    │   ├── verify-app.md              # E2E application verification
    │   └── worktree-worker.md         # Isolated parallel worker
    └── commands/
        ├── babysit.md                 # Auto-address PR reviews
        ├── commit-push-pr.md          # One-command commit + PR
        ├── feature-dev.md             # Planning-first feature workflow
        └── techdebt.md                # Find and fix duplicated code
```

### After Installing

1. Customize `CLAUDE.md` for your project (add your build commands)
2. Review `.claude/settings.json` (update permissions for your tools)
3. Add your MCP servers
4. Commit `.claude/` and `CLAUDE.md` to git

## 2. `course/` — The Full Training

17 modules covering everything Boris does:

| # | Module | Key Takeaway |
|---|--------|-------------|
| 00 | Introduction | Course overview and prerequisites |
| 01 | Core Philosophy | Verification, planning, and pushing for better |
| 02 | Plan Mode | How to get 1-shot implementations |
| 03 | Verification | The #1 principle — feedback loops 2-3x quality |
| 04 | CLAUDE.md | The compounding engineering flywheel |
| 05 | Parallel Sessions | Running 10-15 Claudes simultaneously |
| 06 | Git Worktrees | Parallel isolated development |
| 07 | Custom Agents | Building your agent team |
| 08 | Custom Commands | Slash commands that automate workflows |
| 09 | Hooks | Deterministic logic in agent workflows |
| 10 | Permissions & Security | Pre-allow patterns and sandboxing |
| 11 | MCP Integrations | Slack, BigQuery, Sentry, and more |
| 12 | Prompting Techniques | Getting better output from Claude |
| 13 | Code Review | Multi-agent review automation |
| 14 | Long-Running Tasks | /loop, /schedule, unattended work |
| 15 | Mobile & Cross-Device | Code from anywhere |
| 16 | Team Patterns | Scaling across your org |
| 17 | Terminal & Environment | Ghostty, statusline, voice input |

## Using This With Claude Code

Just open Claude Code in this repo and ask:

- "What's the course here?" — Claude reads the course modules
- "Launch this setup" or "Install the Boris setup into my project" — runs the installer
- "Implement these practices" — Claude applies the patterns from the course
- "Show me how to set up parallel sessions" — Claude walks you through Module 05

## Sources

- [How Boris Uses Claude Code](https://howborisusesclaudecode.com/)
- [Boris Cherny's 15 Tips (GitHub)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-15-tips-30-mar-26.md)
- [XDA: Set Up Claude Code Like Boris Cherny](https://www.xda-developers.com/set-up-claude-code-like-boris-cherny/)
- [Every.to: How to Use Claude Code Like the People Who Built It](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)
- [Boris Cherny on X](https://x.com/bcherny/status/2007179832300581177)
