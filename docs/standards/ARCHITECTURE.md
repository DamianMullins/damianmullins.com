# Architecture

High-level map of how the codebase is organized and how data flows through the system.

## Source Directory Map

```
src/
├── assets/images/       Static images (404.avif, profile-pic.avif)
├── components/          Reusable Astro components (7 files)
├── content/
│   ├── config.ts        Content collection config with Zod schema
│   └── posts/           Markdown blog posts (15 posts)
├── layouts/             Layout component (Layout.astro)
├── pages/               File-based routes (index, 404, tags, [...slug], rss.xml)
├── plugins/             Custom remark plugins (remark-reading-time.ts)
├── scripts/             Client-side scripts (logrocket.ts)
└── styles/              Global CSS with Tailwind v4 theme tokens
```

### `src/components/`

| File                | Role                                                     |
| ------------------- | -------------------------------------------------------- |
| `Header.astro`      | Site title and profile image                             |
| `Nav.astro`         | Navigation links with mobile toggle                      |
| `Footer.astro`      | Author info, social links, copyright                     |
| `Strapline.astro`   | Hero tagline text on the homepage                        |
| `PostListing.astro` | Renders a single post preview (title, date, description) |
| `PostTime.astro`    | Formatted publish date and reading time display          |
| `Tags.astro`        | Renders a list of tag links                              |

### `src/layouts/`

| File           | Role                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| `Layout.astro` | Root wrapper — imports site metadata from `consts.ts`, renders `<head>`, Header, Nav, Footer |

### `src/pages/`

| File               | Route          | Purpose                                             |
| ------------------ | -------------- | --------------------------------------------------- |
| `index.astro`      | `/`            | Homepage — author bio + list of all published posts |
| `404.astro`        | `/404`         | Custom 404 page                                     |
| `[...slug].astro`  | `/{slug}/`     | Individual blog post page (dynamic route)           |
| `tags/index.astro` | `/tags/`       | Lists all tags with post counts                     |
| `tags/[tag].astro` | `/tags/{tag}/` | Posts filtered by a specific tag                    |
| `rss.xml.ts`       | `/rss.xml`     | RSS feed endpoint via `@astrojs/rss`                |

### `src/content/`

| File / Directory | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `config.ts`      | Defines the `posts` collection with glob loader and Zod schema |
| `posts/`         | Markdown blog posts (`YYYY-MM-DD-slug/index.md`)               |

## Astro Configuration

Configuration lives in `astro.config.mjs` at the project root:

### Site settings

- **`site`**: `https://www.damianmullins.com`
- **`trailingSlash`**: `always`
- **Source maps**: Disabled via `vite.build.sourcemap: false`

### Integrations

1. `@astrojs/sitemap` — generates `sitemap-index.xml` at build time
2. `@sentry/astro` — Sentry error tracking integration (source map upload disabled)

### Vite plugins

1. `@tailwindcss/vite` — Tailwind CSS v4 integration

### Markdown processing

- **Shiki** code highlighting with `material-theme-darker` theme (Astro built-in)
- **`remarkReadingTime`** — custom remark plugin at `src/plugins/remark-reading-time.ts`, injects `minutesRead` into frontmatter
- **`rehype-slug`** — adds `id` attributes to headings for anchor links

### Site metadata — `src/consts.ts`

All site-wide constants (title, URL, author name, email, bio, social usernames) are exported from `src/consts.ts` and imported directly wherever needed.

### Content collection — `src/content/config.ts`

Defines the `posts` collection using the `glob` loader (`**/index.md` under `src/content/posts`). Frontmatter is validated with a Zod schema (slug, title, date, description, tags, published, optional minutesRead).

## Data Flow

```
Markdown files (src/content/posts/**/index.md)
        │
        ▼
Astro content collection (glob loader in src/content/config.ts)
        │
        ▼
Zod schema validation (frontmatter type-checked at build time)
        │
        ▼
getCollection('posts') API
        │
        ├──► Page data (index.astro fetches sorted post list)
        ├──► Dynamic routes ([...slug].astro, tags/[tag].astro via getStaticPaths)
        └──► RSS feed (rss.xml.ts fetches posts for feed)
                │
                ▼
        Astro components render HTML
                │
                ▼
        Static HTML (output to dist/)
```

## Component Tree

```
Layout
├── <head> (title, meta, GA script, fonts, manifest)
├── Header
├── Nav
├── <main> {page content}
│   ├── index.astro → Strapline + PostListing[]
│   ├── [...slug].astro → PostTime + rendered Markdown (prose) + Tags
│   ├── tags/index.astro → tag list with counts
│   └── tags/[tag].astro → filtered post links
├── Footer
└── <script> (LogRocket import)
```

## Third-Party Integrations

| Service          | Purpose                           | Configuration                                                                 |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------------- |
| Sentry           | Error tracking and session replay | `@sentry/astro` integration in `astro.config.mjs` + `sentry.client.config.ts` |
| LogRocket        | Session replay                    | Loaded via `src/scripts/logrocket.ts` (production only), imported in Layout   |
| Google Analytics | Page tracking                     | Inline `<script>` tag in `Layout.astro` (measurement ID: `G-NMJS073VTS`)      |
| Checkly          | Uptime monitoring                 | External service, badge in `README.md`                                        |

## Key Libraries

| Package                   | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `@astrojs/rss`            | RSS feed generation (`src/pages/rss.xml.ts`) |
| `@astrojs/sitemap`        | Sitemap generation                           |
| `@tailwindcss/typography` | Prose styling for rendered Markdown content  |
| `@tailwindcss/vite`       | Tailwind CSS v4 Vite integration             |
| `rehype-slug`             | Adds `id` attributes to Markdown headings    |
| `reading-time`            | Calculates reading time for posts            |
| `slugify`                 | Generates URL-safe tag slugs                 |
| `Intl.DateTimeFormat`     | Native date formatting (replaces `date-fns`) |

## Deployment

- **Platform**: GitHub Pages
- **Build output**: `dist/` directory
- **Static assets**: `public/` (icons, `manifest.webmanifest`) — copied as-is to `dist/`
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/astro.yml`
- **PR validation**: `.github/workflows/pr-check.yml` (runs build)
- **Dependency updates**: Dependabot (`.github/dependabot.yml`) — weekly npm update PRs
- **Build environment**: Node 22, pnpm via corepack
