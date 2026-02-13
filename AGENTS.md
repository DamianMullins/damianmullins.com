# AGENTS.md

> Entry point for AI coding agents working in this repository.

## Project

Personal blog and portfolio site for [damianmullins.com](https://www.damianmullins.com), built with Astro and deployed to GitHub Pages.

## Tech Stack

Refer to `package.json` for exact versions.

| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| Astro          | Static site generator              |
| Tailwind CSS 4 | Utility-first styling              |
| TypeScript     | Type-safe scripting                |
| Node.js        | Runtime (see `.nvmrc`)             |
| pnpm           | Package manager (corepack-managed) |
| Prettier       | Code formatting (no linter)        |

## Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `pnpm start`      | Start Astro dev server           |
| `pnpm run build`  | Production build                 |
| `pnpm run serve`  | Preview production build locally |
| `pnpm run format` | Format all files with Prettier   |
| `pnpm run clean`  | Remove `dist/` and `.astro/`     |

## Documentation

- [Development Standards](docs/standards/DEVELOPMENT.md) — Code style, component conventions, data fetching, styling, and content authoring rules.
- [Architecture](docs/standards/ARCHITECTURE.md) — High-level map of where logic lives, data flow, integrations, and deployment.

## Ignore List

Do not modify or reference these paths:

- `dist/` — Build output (gitignored)
- `.astro/` — Astro cache (gitignored)
- `pnpm-lock.yaml` — Auto-generated lockfile
