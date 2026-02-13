# AGENTS.md

> Entry point for AI coding agents working in this repository.

## Project

Personal blog and portfolio site for [damianmullins.com](https://www.damianmullins.com), built with Gatsby and deployed to GitHub Pages.

## Tech Stack

Refer to `package.json` for exact versions.

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| Gatsby     | Static site generator              |
| React      | UI library                         |
| Dart Sass  | SCSS Modules for component styling |
| Node.js    | Runtime (see `.nvmrc`)             |
| pnpm       | Package manager (corepack-managed) |
| Prettier   | Code formatting (no linter)        |

## Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `pnpm start`      | Clean cache and start dev server |
| `pnpm run build`  | Production build                 |
| `pnpm run serve`  | Serve production build locally   |
| `pnpm run format` | Format all files with Prettier   |
| `pnpm run clean`  | Remove `public/` and `.cache/`   |

## Documentation

- [Development Standards](docs/standards/DEVELOPMENT.md) — Code style, component conventions, data fetching, styling, and content authoring rules.
- [Architecture](docs/standards/ARCHITECTURE.md) — High-level map of where logic lives, data flow, integrations, and deployment.

## Ignore List

Do not modify or reference these paths:

- `public/` — Build output (gitignored)
- `.cache/` — Gatsby cache (gitignored)
- `pnpm-lock.yaml` — Auto-generated lockfile
- `pages/robots.txt` — Leftover artifact, not part of the Gatsby build
