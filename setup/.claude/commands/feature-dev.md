Walk through building a feature step-by-step using Boris Cherny's planning-first approach.

Steps:
1. **Specification Phase**: Ask the user exactly what they want. Clarify:
   - What problem does this solve?
   - Who is the user?
   - What are the acceptance criteria?
   - What are the edge cases?

2. **Planning Phase**: Enter Plan Mode and create a detailed implementation plan:
   - Architecture decisions
   - Files to create/modify
   - Data flow
   - Testing strategy
   - Step-by-step task breakdown

3. **Review Phase**: Present the plan to the user. Iterate until they approve.

4. **Implementation Phase**: Switch to auto-accept and implement the plan step by step.
   - After each step, verify the change works (run tests, typecheck, or manual verification)
   - If something goes sideways, re-enter Plan Mode and adjust

5. **Verification Phase**: Run the full test suite, typecheck, and lint. Fix any issues.

6. **Simplification Phase**: Use the code-simplifier agent to review and clean up.
