# Architecture

High-level map of how the codebase is organized and how data flows through the system.

## Source Directory Map

```
src/
├── assets/images/       Static images (404.avif, profile-pic.avif)
├── components/          Reusable React components (8 files)
├── pages/               Gatsby auto-routed pages (index, 404, tags)
├── posts/               Markdown blog posts (15 posts)
├── styles/              SCSS modules, partials, and mixins
└── templates/           Programmatically created page templates (Post, Tags)
```

### `src/components/`

| File             | Role                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `Layout.js`      | Root wrapper — fetches site metadata, renders Header, Nav, Footer, applies global styles |
| `Header.js`      | Site title and profile image                                                             |
| `Nav.js`         | Navigation links with mobile toggle (class component)                                    |
| `Footer.js`      | Author info, social links, copyright                                                     |
| `Strapline.js`   | Hero tagline text on the homepage                                                        |
| `PostListing.js` | Renders a single post preview (title, date, description, tags)                           |
| `PostTime.js`    | Formatted publish date display                                                           |
| `Tags.js`        | Renders a list of tag links                                                              |

### `src/pages/`

| File       | Route   | Purpose                                             |
| ---------- | ------- | --------------------------------------------------- |
| `index.js` | `/`     | Homepage — author bio + list of all published posts |
| `404.js`   | `/404`  | Custom 404 page                                     |
| `tags.js`  | `/tags` | Lists all tags with post counts                     |

### `src/templates/`

| File      | Route pattern | Purpose                          |
| --------- | ------------- | -------------------------------- |
| `Post.js` | `/{slug}`     | Individual blog post page        |
| `Tags.js` | `/tags/{tag}` | Posts filtered by a specific tag |

## Gatsby Lifecycle Files

These files live at the project root and control the build pipeline:

### `gatsby-config.js`

- **Site metadata**: title, siteUrl, author, authorEmail, authorBio, social usernames (GitHub, Twitter, LinkedIn).
- **Plugins** (in load order):
  1. `gatsby-plugin-no-sourcemaps`
  2. `gatsby-source-filesystem` — sources all files under `src/`
  3. `gatsby-plugin-manifest` — PWA manifest, icon from `profile-pic.avif`
  4. `gatsby-plugin-gtag` — Google Analytics (G-NMJS073VTS)
  5. `gatsby-plugin-feed` — RSS feed at `/rss.xml`
  6. `gatsby-plugin-sitemap`
  7. `gatsby-plugin-sass`
  8. `gatsby-plugin-react-helmet`
  9. `gatsby-transformer-remark` with `gatsby-remark-heading-slug`, `gatsby-remark-prismjs`, `gatsby-remark-copy-linked-files`
  10. `gatsby-plugin-catch-links`
  11. `@sentry/gatsby`

### `gatsby-node.js`

Programmatically creates pages at build time:

1. **Post pages** — Queries all published Markdown nodes, creates a page for each at its `frontmatter.slug` using `src/templates/Post.js`.
2. **Tag pages** — Collects all unique tags across posts, generates `/tags/{kebab-slug}` routes using `src/templates/Tags.js`. Tag slugs are generated via the `slugify` package.

### `gatsby-browser.js`

Runs client-side in **production only**:

- Initializes **LogRocket** session replay.
- Initializes **Sentry** error tracking with browser tracing and session replay. Attaches LogRocket session URL to Sentry events.
- Release version is set from `GATSBY_RELEASE_VERSION` (populated from `package.json` version during build).

## Data Flow

```
Markdown files (src/posts/**/index.md)
        │
        ▼
gatsby-source-filesystem (reads files into Gatsby's data layer)
        │
        ▼
gatsby-transformer-remark (parses Markdown + frontmatter into GraphQL nodes)
        │
        ▼
GraphQL data layer
        │
        ├──► useStaticQuery (Layout.js fetches site metadata)
        ├──► Page queries (index.js, tags.js fetch post lists)
        └──► Template queries (Post.js, Tags.js fetch individual content)
                │
                ▼
        React components render HTML
                │
                ▼
        Static HTML + JS bundle (output to public/)
```

## Component Tree

```
Layout
├── Header
├── Nav
├── {page content}
│   ├── index.js → Strapline + PostListing[] + Tags
│   ├── Post.js → PostTime + Tags + rendered Markdown
│   └── Tags.js → PostListing[]
└── Footer
```

## Third-Party Integrations

| Service          | Purpose                           | Configuration                                               |
| ---------------- | --------------------------------- | ----------------------------------------------------------- |
| Sentry           | Error tracking and session replay | `@sentry/gatsby` plugin + `gatsby-browser.js`               |
| LogRocket        | Session replay                    | Initialized in `gatsby-browser.js` (production only)        |
| Google Analytics | Page tracking                     | `gatsby-plugin-gtag` (measurement ID in `gatsby-config.js`) |
| Checkly          | Uptime monitoring                 | External service, badge in `README.md`                      |

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/gatsby.yml`
- **PR validation**: `.github/workflows/pr-check.yml` (runs build)
- **Dependency updates**: Dependabot (`.github/dependabot.yml`) — weekly npm update PRs
- **Build environment**: Node 22, pnpm via corepack, caches `public/` and `.cache/`
