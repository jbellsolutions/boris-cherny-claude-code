Commit all staged changes with a descriptive commit message, push to the current branch, and open a PR.

Steps:
1. Run `git diff --cached` to review staged changes
2. Write a clear, concise commit message that describes the "why" not the "what"
3. Commit the changes
4. Push to the current branch (create upstream if needed)
5. Create a PR using `gh pr create` with a summary and test plan
6. Report the PR URL
