# Module 12: Prompting Techniques

## Boris's Prompting Principles

### 1. Challenge Claude
Don't accept mediocrity. Push for better:

```
"Grill me on these changes and don't make a PR until I pass your test"
```

```
"Knowing everything you know now, scrap this and implement the elegant solution"
```

```
"Prove to me this works"
```

### 2. Demand Proof
Have Claude diff behavior between branches:

```
"Prove this works by diffing behavior on main vs this feature branch"
```

```
"Run the test suite on main, then on this branch, and show me the difference"
```

### 3. Write Detailed Specs
Reduce ambiguity before handing off. More specific inputs = better outputs:

**Bad**: "Add authentication"
**Good**: "Add JWT-based auth with refresh tokens. Use the existing User model. Store tokens in httpOnly cookies. Add middleware to protect /api/* routes. Include rate limiting on /auth/login."

### 4. Iterative Refinement
After a mediocre first pass:

```
"Knowing everything you know now, scrap this and implement the elegant solution"
```

This leverages the context Claude built during the first attempt to produce a much better second attempt.

### 5. Give Direction, Not Instructions
Let Claude figure out how:

**Micromanaging**: "Open file X, find line Y, change Z to W"
**Directing**: "Go fix the failing CI tests"

Claude knows how to navigate a codebase. Tell it what you want, not how to get there.

## Voice Input

Boris advocates for voice input — dictation is 3x faster than typing:

- **CLI**: `/voice` then hold spacebar to dictate
- **macOS**: Press `fn` twice for system dictation
- **Desktop app**: Click the voice button

> When you speak your prompts, they naturally become more detailed and thoughtful than when you type them.

## Output Styles

Configure how Claude communicates:
- **Explanatory**: Explains the "why" behind code changes
- **Learning**: Coaches you through making changes yourself
- **Custom**: Create your own output style

Set via `/config`.

### Learning Mode Use Case
Ask Claude to generate visual HTML presentations explaining unfamiliar code, or create ASCII diagrams of protocols and codebases.

Build a spaced-repetition learning skill where you explain your understanding and Claude asks follow-up questions.

## The /btw Pattern

For quick side questions without interrupting current work:
```
/btw what does this regex do: ^(?:[a-z0-9]+\.)*[a-z0-9]+$
```

Full context, immediate answer, Claude resumes previous task.

## Effort Levels

Match reasoning depth to the task:
- `/effort low` — Quick lookups, simple questions
- `/effort medium` — Default for most work
- `/effort high` — Complex architecture decisions
- `/effort max` — Unlimited reasoning (burns through usage faster)
