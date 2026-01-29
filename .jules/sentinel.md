## 2025-05-14 - [Avoid project-wide formatting and lockfile updates]
**Vulnerability:** Not a code vulnerability, but a workflow one. Running `pnpm format` and `pnpm install` in some environments can lead to massive, unintended changes to the lockfile and other files.
**Learning:** Automated tools like Prettier or package managers can sometimes cause widespread changes that obscure the actual security fix and violate the "keep changes under 50 lines" rule.
**Prevention:** Avoid running project-wide formatting if the codebase is not already perfectly formatted according to the local rules. Be careful with `pnpm install` if it updates the lockfile significantly. Always verify the diff before committing.
