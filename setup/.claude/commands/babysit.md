Auto-address code review comments on the current PR, auto-rebase, and shepherd the PR to merge.

Steps:
1. Run `gh pr view` to get the current PR status
2. Run `gh pr checks` to see CI status
3. Run `gh api repos/{owner}/{repo}/pulls/{number}/comments` to read review comments
4. Address each review comment by making the requested changes
5. If the branch is behind, rebase onto the base branch
6. Push the changes
7. Reply to each review comment explaining what was changed
8. If all checks pass and reviews are approved, report "Ready to merge"
