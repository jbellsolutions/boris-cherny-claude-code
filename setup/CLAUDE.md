# Boris Cherny's Claude Code Setup
# Based on the practices of the creator of Claude Code

## Development Workflow
1. Make changes
2. Typecheck (fast): bun run typecheck
3. Run tests: bun run test -- -t "test name"
4. Lint before committing: bun run lint:file
5. Before creating PR: bun run lint && bun run test

## Core Principles
- Always start complex tasks in Plan Mode (Shift+Tab twice) — iterate on the plan before implementation
- Give Claude a way to verify its work. Verification feedback loops 2-3x the quality of final output
- Use Opus with thinking mode for all tasks — less steering + better tool use = faster overall
- When things go sideways, re-enter Plan Mode instead of pushing forward
- Don't accept the first solution — push Claude to do better

## Code Quality Rules
- Run the full test suite before creating any PR
- Verify every change with tests, browser testing, or CLI output before landing
- Use /simplify after implementation to find reuse opportunities and ensure CLAUDE.md compliance
- Challenge Claude: "Grill me on these changes and don't make a PR until I pass your test"
- Demand proof: "Prove to me this works" — have Claude diff behavior between main and feature branch

## Working with This Codebase
- Anytime Claude does something incorrectly, add it below under "Corrections"
- This file is checked into git — the whole team should contribute
- Ruthlessly edit over time until the mistake rate measurably drops

## Corrections
<!-- Add entries here whenever Claude makes a mistake. Format: -->
<!-- - [Date] Description of what Claude did wrong and what it should do instead -->
