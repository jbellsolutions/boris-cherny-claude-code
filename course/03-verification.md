# Module 03: Verification — The #1 Principle

## The Rule

> "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."

This is not optional. This is the single biggest lever for output quality.

## Types of Verification

### 1. Test Suites (Strongest)
```
bun run test -- -t "test name"    # Run specific test
bun run test                       # Run full suite
```

When Claude can run tests after making changes, it catches its own mistakes and fixes them before you even see the output.

### 2. Type Checking
```
bun run typecheck
```

Fast feedback. Catches type errors, missing properties, incorrect function signatures.

### 3. Build Verification
```
bun run build
```

Ensures the whole project compiles. Catches import errors, missing dependencies, syntax issues.

### 4. Browser Testing (Chrome Extension)
For frontend work, the Chrome extension lets Claude:
- Open the browser
- Navigate to your app
- Test the UI visually
- Iterate until it looks correct

This is critical for any UI work. Without it, Claude is guessing what things look like.

### 5. CLI Output
For backend or CLI tools, Claude runs the command and reads the output:
```bash
curl http://localhost:3000/api/health
node scripts/validate.js
```

### 6. Diff Verification
Ask Claude to prove changes work by comparing behavior:
```
"Prove to me this works — diff the behavior on main vs this branch"
```

## How to Build Verification Into Your Workflow

### In CLAUDE.md
```markdown
## Development Workflow
1. Make changes
2. Typecheck: bun run typecheck
3. Run tests: bun run test -- -t "test name"
4. Lint: bun run lint:file
5. Before PR: bun run lint && bun run test
```

Claude reads this and follows the workflow automatically.

### In Custom Agents
Build verification into your agents. The `verify-app.md` agent runs build, tests, smoke tests, and regression checks.

### In Hooks
Use PostToolUse hooks to auto-format after every edit:
```json
"PostToolUse": [{
  "matcher": "Write|Edit",
  "hooks": [{
    "type": "command",
    "command": "bun run format || true"
  }]
}]
```

### In Prompts
- "Run the tests after every change"
- "Don't create a PR until all checks pass"
- "Verify this works by running the application"

## The Anti-Pattern

The worst thing you can do is let Claude make changes without any verification. It will:
- Introduce subtle bugs
- Break existing functionality
- Create code that looks right but doesn't work

Always close the feedback loop.
