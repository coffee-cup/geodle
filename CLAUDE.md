# Geodle

Daily country silhouette guessing game (Wordle-style).

## Stack

- TanStack Start (latest RC, v1.159+) — no longer uses vinxi
- Vite 7, React 19, Tailwind CSS v4
- d3-geo, seedrandom, fuzzysort

## Key Architecture Decisions

- Answer never stored — derived deterministically via `seedrandom(SALT + puzzleNumber)`
- Server functions use `createServerFn` from `@tanstack/react-start` with `.inputValidator()` (not `.validator()`)
- Data pipeline (`bun run data/scripts/prepare-countries.ts`) generates 3 static JSON files from Natural Earth
- Country difficulty is tag-based (explicit sets), not area-computed

## TanStack Start Setup (v1.159+)

- Entry: `src/router.tsx` exports `getRouter()` — required by the start plugin
- Route tree: auto-generated at `.tanstack/` / `src/routeTree.gen.ts`
- Vite config: `tanstackStart()` from `@tanstack/react-start/plugin/vite`
- Root route uses `shellComponent` (not `component`) for the HTML wrapper
- Dev: `vite dev`, Build: `vite build` — no vinxi
- Server env vars: use `import.meta.env` in server fns (Vite handles it)

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Cartographic/editorial aesthetic: paper bg (#f5f0e8), serif display (Playfair Display), muted gold accent
- Use plain Tailwind — no baseline-ui library, no gradients
- Use `text-balance` for headings, `text-pretty` for body, `tabular-nums` for numeric data
- Use `min-h-dvh` not `min-h-screen`

## Data Files

- `src/data/countries.geojson.json` — FeatureCollection, properties stripped to `{code}` only
- `src/data/countries-meta.json` — server-only, has centroid/difficulty
- `src/data/countries-list.json` — client-safe, for autocomplete

## Dev

- Port: 5543 (`mise run dev` or `bun run dev`)
- NEVER run the dev server from Claude — let the user run it manually

## Testing

- Vitest with jsdom, tests in `tests/`
- Server fn logic tested via direct function simulation (not through createServerFn runtime)
