# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 16 landing page (`mitt-prosjekt`) with an A/B test powered by PostHog feature flags. There is no backend, database, or Docker.

### Services

| Service | Command | Port |
|---|---|---|
| Next.js dev server | `npm run dev` | 3000 |

PostHog analytics is optional — the page renders without `NEXT_PUBLIC_POSTHOG_KEY` (defaults to the "variant" design).

### Standard commands

See `package.json` scripts: `npm run dev`, `npm run build`, `npm run lint` (`eslint`).

### Notes

- There is a pre-existing ESLint error in `app/providers.tsx` (`react-hooks/set-state-in-effect`). This is in the existing code, not introduced by setup.
- The app uses Tailwind CSS v4 via `@tailwindcss/postcss`.
- No `.env` file is needed to run the dev server; PostHog env vars are optional.
