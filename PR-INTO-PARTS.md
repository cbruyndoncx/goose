# PR Split Plan — PR-INTO-PARTS.md

Goal

Create a set of small, focused branches/PRs from the current large change (squashed into branch `clean-slate/*`) so each PR contains one feature-area only.

Overview of feature branches

- feat/auth-middleware
  - Purpose: centralize auth usage via axum middleware (auth::check_token) and remove inline header checks
  - Server files: `crates/goose-server/src/auth.rs`, `crates/goose-server/src/commands/agent.rs`, route handlers that previously called `verify_secret_key`

- feat/custom-providers-backend
  - Purpose: backend support for creating/updating/removing custom providers and refresh logic
  - Files: `crates/goose/src/config/custom_providers.rs`, `crates/goose-server/src/routes/config_management.rs` (custom provider endpoints & refresh calls)

- feat/provider-adapters
  - Purpose: provider-side fixes and adapter/format updates
  - Files: `crates/goose/src/providers/api_client.rs`, `crates/goose/src/providers/formats/openai.rs`, `crates/goose/src/providers/openai.rs`, `crates/goose/src/providers/provider_registry.rs`, `crates/goose/src/providers/utils.rs`

- feat/ui-provider-config
  - Purpose: UI modal + forms for provider configuration
  - Files: `ui/desktop/src/components/providers/modal/*`, `ui/desktop/src/components/subcomponents/forms/CustomProviderForm.tsx`, `ui/desktop/src/components/subcomponents/forms/DefaultProviderSetupForm.tsx`, `ui/desktop/src/components/subcomponents/forms/DefaultSubmitHandler.tsx`

- feat/ui-provider-grid
  - Purpose: provider grid / registry UI changes
  - Files: `ui/desktop/src/components/settings/providers/ProviderGrid.tsx`, related presentation components

- feat/ui-secret-constants
  - Purpose: small UI utilities and secret constants
  - Files: `ui/desktop/src/utils/secretConstants.ts`, `ui/desktop/src/utils.ts`

- chore/tests-openapi
  - Purpose: tests, openapi generation, docs updates
  - Files: tests and `just generate-openapi` artifacts; update UI API types if needed


Per-branch workflow (exact commands you can run or I can run for you)

1. Prepare (once)

```bash
# start from the clean-slate branch I created from origin/main
git checkout clean-slate/fix-goosed-ui-custom-providers-and-providers-edit-and-providers-grid
export SQUASH_COMMIT=$(git rev-parse HEAD)
```

2. Create a feature branch and select hunks

```bash
# create feature branch off of origin/main
git checkout -b feat/<feature-name> origin/main
# apply squashed changes to working tree (no commit)
git cherry-pick -n $SQUASH_COMMIT
# unstage everything so you can selectively stage hunks
git reset
# interactively stage hunks that belong to this feature
git add -p <paths...>
# commit only the staged hunks
git commit -m "feat(<area>): short description"
# run build/tests for this scope
# for server code:
cargo build -p goose-server
cargo test -p goose-server
# for UI code:
cd ui/desktop && npm install && npm run lint && npm test
# push feature branch
git push -u origin feat/<feature-name>
```

3. Repeat step 2 for each feature branch


Guidelines for splitting hunks

- Prefer grouping by logical feature (auth, backend custom-providers, provider adapters, UI modals, UI registry).
- If a single logical feature touches both server and UI, you may keep them in one feature branch or split server and UI into two related branches (e.g., `feat/custom-providers-backend` and `feat/ui-provider-config`).
- Use `git add -p` to stage hunks; for complicated hunks, consider `git add -e` to edit the patch.


Testing & CI

- After creating each feature branch, run the relevant build+tests locally (Rust: `cargo build/test`, UI: `npm run lint/test`) and adjust until green.
- If you change server routes, run `just generate-openapi` and then rebuild the UI (the openapi artifacts in `ui/desktop/src/api/*` may change).


Post-split housekeeping

- Create a small PR for each feature branch with a clear description, files changed, and testing instructions.
- Keep `clean-slate/*` as the squashed snapshot until all feature PRs are created; you can delete it later.


If you want me to perform the splits

I can perform the branch creation and interactive staging for you. Tell me:
- Approve this plan as-is
- Which feature branch to create first (I recommend `feat/auth-middleware`)

I will then create the branch, stage and commit only the relevant hunks, run the build/tests for that feature, push the branch, and open a draft PR if you want.
