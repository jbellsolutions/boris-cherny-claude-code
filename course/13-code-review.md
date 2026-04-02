# Module 13: Code Review Automation

## How Boris Does Code Review

Boris's code review dispatches a team of agents on every PR. Each agent focuses on a different concern and they run in parallel.

### The Multi-Agent Review Pattern

**First Pass** — 5 subagents check different dimensions:
1. **Logic errors**: Data flow, off-by-one, null handling, race conditions
2. **Security**: Injection, auth/authz gaps, secrets in code
3. **Performance**: N+1 queries, memory leaks, unnecessary re-renders
4. **Style**: CLAUDE.md compliance, codebase conventions
5. **Edge cases**: Boundary conditions, unexpected inputs/states

**Second Pass** — 5 more subagents challenge the first pass:
- "Is this actually a bug or a false positive?"
- "Would this really happen in production?"
- "Is this a stylistic preference or a real concern?"

Only real bugs with specific `file:line` references survive.

### Results at Anthropic
> Code output per engineer up 200% this year — partly due to code review automation

## Setting Up Automated Review

### Agent-Based Review
Use the `code-reviewer.md` agent from the setup:
```bash
claude --agent code-reviewer
```

### GitHub Action Review
Install with `/install-github-action`:
- Runs on every PR opening
- Posts inline comments on real bugs directly on the PR
- Team members can tag with `@.claude` to add learnings

### Manual Review in Session
```
"Review the diff on this branch as if you were a staff engineer. 
Focus on bugs, not style. Be specific — file:line references only."
```

## The "Grill Me" Pattern

Instead of just reviewing code, make Claude test your understanding:
```
"Grill me on these changes and don't make a PR until I pass your test"
```

Claude will:
1. Ask you to explain the changes
2. Challenge your assumptions
3. Point out things you might have missed
4. Only approve when you demonstrate understanding

## Proof of Correctness

```
"Prove to me this works — diff the behavior on main vs this branch"
```

Claude will:
1. Check out main
2. Run the relevant test or behavior
3. Check out the feature branch
4. Run the same test
5. Show you the difference

## Two-Claude Review

1. **Claude A** implements the feature
2. **Claude B** reviews it as a staff engineer in a separate session

This is surprisingly effective — Claude B catches things Claude A missed because it approaches the code fresh.
