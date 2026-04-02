# Module 01: Core Philosophy

## Boris's Three Rules

### 1. Verification Is Everything

> "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."
> — Boris Cherny

This is the single most important principle. Every workflow, every agent, every command Boris builds is designed around this: Claude must be able to check its own work.

**Verification methods (from strongest to weakest):**
- Test suites (`bun run test`)
- Type checking (`bun run typecheck`)
- Build output (`bun run build`)
- Browser testing (Chrome extension)
- CLI output from bash commands
- Simulators

### 2. Plan First, Execute Second

Boris enters **Plan Mode** at the start of every complex session. A good plan leads to 1-shot implementations. A bad plan leads to iteration hell.

The pattern:
1. Enter Plan Mode (Shift+Tab twice)
2. Iterate on the plan with Claude until it's solid
3. Switch to auto-accept
4. Implement

When things go sideways during implementation, **don't push forward** — go back to Plan Mode and re-plan.

### 3. Don't Accept the First Answer

Claude can almost always do better. Push it:
- "Knowing everything you know now, scrap this and implement the elegant solution"
- "Grill me on these changes and don't make a PR until I pass your test"
- "Prove to me this works"

Boris treats Claude like a talented junior engineer — capable of great work, but you need to set the bar high.

## Model Choice

Boris exclusively uses **Opus with thinking mode** for all tasks.

Why: "Less steering + better tool use = faster overall results, even with larger model."

The counterintuitive insight: a bigger, smarter model that needs less hand-holding is faster end-to-end than a smaller model that needs more correction.

You can set effort levels:
- **Low**: Quick answers, minimal reasoning
- **Medium**: Balanced (default)
- **High**: Deeper reasoning
- **Max**: Unlimited tokens per turn — reason as long as needed (use `/effort max`)

## The Compounding Effect

Every time Claude makes a mistake, Boris adds a correction to CLAUDE.md. Over time, the mistake rate drops measurably. This is **compounding engineering** — each correction prevents all future occurrences of that mistake.

Combined with custom agents, commands, and hooks, this creates a system where Claude gets better at your specific codebase every day.
