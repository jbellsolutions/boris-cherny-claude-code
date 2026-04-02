# Module 04: CLAUDE.md — The Compounding Engineering Flywheel

## What CLAUDE.md Is

CLAUDE.md is a file at the root of your project that Claude reads at the start of every session. It contains:
- Development workflow instructions
- Build/test/lint commands
- Codebase conventions
- Corrections (things Claude got wrong before)
- Project-specific rules

## Boris's Approach

### Single File, Team Maintained
- One CLAUDE.md file checked into git
- The whole team contributes — multiple updates per week
- Ruthlessly edited over time until mistake rate measurably drops

### The Correction Pattern
> "Anytime we see Claude do something incorrectly, we add it to the CLAUDE.md"

This is the compounding flywheel:
1. Claude makes a mistake
2. You add a correction to CLAUDE.md
3. Claude never makes that mistake again
4. Over time, the mistake rate drops measurably

### Example CLAUDE.md

```markdown
# Development Workflow
Always use `bun`, not `npm`
1. Make changes
2. Typecheck (fast): bun run typecheck
3. Run tests: bun run test -- -t "test name"
4. Lint before committing: bun run lint:file
5. Before creating PR: bun run lint:claude && bun run test

# Corrections
- Never use `any` type — always define explicit types
- Don't create barrel exports (index.ts re-exporting everything)
- Use `invariant()` instead of throwing errors directly
- Database queries must use parameterized queries, never string interpolation
- Always check for null before accessing nested properties from API responses
```

### GitHub Action for Auto-Updates
Boris uses a GitHub Action that monitors PRs tagged with `@.claude`:
- Team members tag PRs with learnings
- The action auto-updates CLAUDE.md
- `/install-github-action` sets this up

### Notes Directory Pattern
One team member on Boris's team maintains a notes directory for each task/project:
```
notes/
├── auth-refactor/
│   ├── decisions.md
│   └── gotchas.md
├── api-migration/
│   └── learnings.md
```

CLAUDE.md points to these notes so Claude has project-specific context.

## Scoping CLAUDE.md

CLAUDE.md files can exist at multiple levels:
- **Root**: `./CLAUDE.md` — project-wide rules
- **Subdirectory**: `./src/components/CLAUDE.md` — rules for that directory
- **Global**: `~/.claude/CLAUDE.md` — rules for all projects

Use subdirectory CLAUDE.md files for module-specific conventions (e.g., frontend patterns in `src/components/CLAUDE.md`).

## What to Put In (and What Not To)

### Good entries:
- Build/test/lint commands
- Package manager preference (bun, not npm)
- Coding conventions that differ from defaults
- Corrections for repeated mistakes
- Architecture decisions that affect implementation
- Links to design docs or specs

### Bad entries:
- General programming advice Claude already knows
- Obvious things ("write clean code")
- Temporary notes (use a task list instead)
- Extremely long documents (keep it focused)
