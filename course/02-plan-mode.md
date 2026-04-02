# Module 02: Plan Mode

## Why Plan Mode Matters

> "A good plan is really important."
> — Boris Cherny

Boris starts every complex session in Plan Mode. The reason is simple: a well-thought-out plan leads to 1-shot implementation. Without a plan, Claude guesses — and guesses require iteration.

## How to Enter Plan Mode

- **Keyboard**: Press `Shift+Tab` twice during input
- **CLI flag**: Start with thinking mode enabled
- **During session**: Type "let's plan this first" or "enter plan mode"

## The Plan Mode Workflow

### Step 1: Define the Problem
Tell Claude what you want to build. Be specific:
- What problem does this solve?
- Who is the user?
- What are the constraints?

### Step 2: Let Claude Ask Questions
In Plan Mode, Claude will ask clarifying questions:
- Technology stack preferences
- Integration requirements
- Edge cases to consider
- Performance requirements

Answer these thoroughly. Every ambiguity resolved here saves time later.

### Step 3: Review the Plan
Claude produces a detailed plan with:
- Architecture decisions
- Files to create/modify
- Data flow
- Testing strategy
- Step-by-step task breakdown

### Step 4: Iterate
This is where most people skip ahead. Don't. Review the plan critically:
- Does it handle edge cases?
- Is the architecture sound?
- Is there a simpler approach?

Push back: "What about X?" or "Can we simplify step 3?"

### Step 5: Execute
Once the plan is solid, switch to auto-accept and let Claude implement it.

## Recovery Pattern

When implementation goes sideways during execution:

1. **Stop** — don't let Claude keep digging
2. **Re-enter Plan Mode** — "Let's stop and re-plan this"
3. **Analyze what went wrong** — "What assumptions were incorrect?"
4. **Create a new plan** — informed by what you now know
5. **Resume execution** — with the corrected approach

## Two-Claude Pattern

For high-stakes features, Boris sometimes uses two Claudes:
1. **Claude A** writes the plan
2. **Claude B** reviews it as a staff engineer

This catches architectural issues before any code is written.

## Session Naming

Name your sessions for easy tracking:
```bash
claude --name "auth-refactor"
```

After Plan Mode, sessions auto-name based on the planned task (e.g., "refactor-auth-jwt").
