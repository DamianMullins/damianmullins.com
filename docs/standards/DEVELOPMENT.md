# Development Standards

Rules and conventions for working in this codebase.

## Code Style

Formatting is handled by **Prettier** only — there is no linter.

Run `pnpm run format` to format all files. See `.prettierrc` for the full configuration.

Key rules: single quotes, no semicolons, no trailing commas, 2-space indentation, arrow functions omit parens for single params.

## Component Conventions

- **Functional arrow components** with `export default` at the bottom of the file.
- **PropTypes** from the `prop-types` package for prop validation (declared as a static property after the component definition).
- One component per file in `src/components/`.

### Reference Examples

- **Standard UI component**: `src/components/PostListing.js` — PropTypes, SCSS module imports, clean functional pattern.
- **Data-fetching component**: `src/components/Layout.js` — Uses `useStaticQuery` hook to fetch site metadata from GraphQL.
- **Class component**: `src/components/Nav.js` — The only class component in the codebase; uses `React.createRef()`.

## Data Fetching

All data is fetched via Gatsby's GraphQL layer. Three patterns are used:

### 1. `useStaticQuery` (component-level)

For non-page components that need static data at build time.

**Reference**: `src/components/Layout.js`

### 2. Exported page queries (page-level)

Pages export a `graphql` tagged template literal. Gatsby injects the result as `data` prop.

**Reference**: `src/pages/index.js`

### 3. Parameterized template queries

Templates receive context variables (e.g., `$path`, `$tag`) from `gatsby-node.js` and use them in GraphQL query filters.

**Reference**: `src/templates/Post.js`, `src/templates/Tags.js`

### Query convention

All queries that fetch posts filter by `frontmatter: { published: { eq: true } }` to exclude unpublished drafts.

## Styling

The project uses **SCSS Modules** via `gatsby-plugin-sass`.

### Rules

- Each component has a corresponding `.module.scss` file in `src/styles/`.
- Import styles as **named destructured imports**: `import { footer, links } from '../styles/footer.module.scss'`.
- Apply classes via `className={footer}` (no `styles.` prefix).

### Style architecture

| Path                                  | Purpose                                                  |
| ------------------------------------- | -------------------------------------------------------- |
| `src/styles/partials/_variables.scss` | Font family, base font size, line height                 |
| `src/styles/partials/_colors.scss`    | Color palette (`$c-dark`, `$c-light`, `$c-green`, etc.)  |
| `src/styles/partials/_base.scss`      | Global typography and element styles                     |
| `src/styles/partials/_normalize.scss` | Vendored normalize.css v8.0.0                            |
| `src/styles/mixins/_mixins.scss`      | Shared mixins (e.g., `links()` for underline decoration) |
| `src/styles/_dependencies.scss`       | Aggregates partials for global import                    |
| `src/styles/global.module.scss`       | Entry point for global styles (imported in `Layout.js`)  |

### Colors

```scss
$c-dark: #1c1b1b;
$c-dark-01: #222020;
$c-dark-02: #2f2f2f;
$c-light: #dadada;
$c-light-01: #656565;
$c-green: #00cd81;
```

### Font

Open Sans, sans-serif — base size 18px, line-height 1.45em.

### Code highlighting

PrismJS with the `prism-material-dark` theme, imported globally in `Layout.js`.

## Content Authoring

Blog posts are Markdown files located at `src/posts/YYYY-MM-DD-slug/index.md`.

### Required frontmatter

```yaml
---
slug: '/my-post-slug/'
title: My Post Title
date: '2024-01-15T10:00'
description: A short summary of the post.
tags:
  - javascript
  - react
published: true
---
```

| Field         | Type     | Notes                                   |
| ------------- | -------- | --------------------------------------- |
| `slug`        | string   | Must start and end with `/`             |
| `title`       | string   | Post title                              |
| `date`        | string   | ISO 8601 datetime                       |
| `description` | string   | Used in meta tags and post listings     |
| `tags`        | string[] | Lowercase, used for tag pages           |
| `published`   | boolean  | Set `false` to exclude from all queries |

### Images

Co-locate images in the post directory alongside `index.md`. Reference them with relative Markdown image syntax. `gatsby-remark-copy-linked-files` handles copying them to the build output.

## Testing

No test framework or tests currently exist in this project.

## CI / CD

- **PR checks**: `.github/workflows/pr-check.yml` — runs `pnpm run build` on every pull request.
- **Deployment**: `.github/workflows/gatsby.yml` — builds and deploys to GitHub Pages on push to `main`.
- **Dependency updates**: `.github/dependabot.yml` — weekly npm update PRs.
