# Geodle

Daily country silhouette guessing game (Wordle-style).

## Stack

- TanStack Start (latest RC, v1.159+)
- Vite 7, React 19, Tailwind CSS v4
- seedrandom, fuzzysort

## Key Architecture Decisions

- Answer derived deterministically via `seedrandom(SALT + puzzleNumber)` — never stored
- Server fns: `createServerFn` with `.inputValidator()` (not `.validator()`)
- Root route uses `shellComponent` (not `component`) for HTML wrapper
- Entry: `src/router.tsx` exports `getRouter()`
- Route tree auto-generated at `src/routeTree.gen.ts`
- Server env vars: `import.meta.env` in server fns
- Data pipeline: `mise run data` runs both prepare-countries (meta JSON) and download-silhouettes (Borderly SVGs)
- Silhouettes are high-res SVGs from Borderly, checked into `src/data/silhouettes/`, loaded via Vite `?raw` glob
- Country difficulty is tag-based (explicit sets), not area-computed

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Cartographic/editorial aesthetic: paper bg (#f5f0e8), serif display (Playfair Display), muted gold accent
- Plain Tailwind — no baseline-ui, no gradients
- `text-balance` for headings, `text-pretty` for body, `tabular-nums` for numeric data
- `min-h-dvh` not `min-h-screen`

## Data Files

- `src/data/silhouettes/*.svg` — high-res country SVGs from Borderly (239 files), `currentColor` fill
- `src/data/countries-meta.json` — server-only, has centroid/difficulty
- `src/data/countries-list.json` — client-safe, for autocomplete

## Dev

- NEVER run the dev server from Claude — let the user run it manually
- Dev server runs on port 5543
- Always use `mise run` for tasks — never call pnpm/bun/vitest directly
- `mise run check` — typecheck after changes
- `mise run test` — run tests

## Testing

- Vitest with jsdom, tests in `tests/`
- Server fn logic tested via direct function simulation (not through createServerFn runtime)
