Find and eliminate duplicated code and technical debt in the codebase.

Steps:
1. Search the codebase for duplicated patterns, copy-pasted code blocks, and similar implementations
2. Identify which duplications are worth consolidating (3+ occurrences or complex logic)
3. For each duplication:
   - Show the duplicated code locations
   - Propose a shared abstraction or utility
   - Explain the tradeoff (is the abstraction worth it?)
4. Only consolidate clear wins — don't create premature abstractions for 2 similar lines
5. Run tests after each change to verify nothing broke
6. Create a summary of all changes made and debt remaining
