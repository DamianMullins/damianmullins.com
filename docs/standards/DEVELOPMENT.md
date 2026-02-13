# Development Standards

Rules and conventions for working in this codebase.

## Code Style

Formatting is handled by **Prettier** only — there is no linter.

Run `pnpm run format` to format all files. See `.prettierrc` for the full configuration.

Key rules: single quotes, no semicolons, no trailing commas, 2-space indentation, arrow functions omit parens for single params.

## Component Conventions

- **Astro components** (`.astro` files) with frontmatter script in the `---` fence and template below.
- **TypeScript** is used throughout — props are typed via `interface Props` in the component frontmatter.
- One component per file in `src/components/`.

### Reference Examples

- **Standard UI component**: `src/components/PostListing.astro` — typed props, Tailwind utility classes.
- **Layout component**: `src/layouts/Layout.astro` — imports site metadata from `src/consts.ts`, renders `<head>`, Header, Nav, Footer.
- **Navigation component**: `src/components/Nav.astro` — navigation links with mobile toggle.

## Data Fetching

All data is fetched via Astro **content collections** and static imports. Three patterns are used:

### 1. Content collections with `getCollection()` (page-level)

Pages and dynamic routes call `getCollection('posts')` from `astro:content` to query the posts collection at build time. An optional filter callback excludes unpublished drafts.

**Reference**: `src/pages/index.astro`, `src/pages/[...slug].astro`

### 2. Static imports from `src/consts.ts` (component-level)

Site metadata (title, URL, author, social usernames) is defined as named exports in `src/consts.ts` and imported directly by any component that needs it.

**Reference**: `src/layouts/Layout.astro`, `src/pages/rss.xml.ts`

### 3. Dynamic route `getStaticPaths()` (parameterized pages)

Dynamic route files export a `getStaticPaths` function that queries the collection and returns `params` + `props` for each page.

**Reference**: `src/pages/[...slug].astro`, `src/pages/tags/[tag].astro`

### Query convention

All calls to `getCollection()` pass a filter callback `({ data }) => data.published` to exclude unpublished drafts.

## Styling

The project uses **Tailwind CSS v4** utility classes with the `@tailwindcss/typography` plugin for Markdown content rendering. Tailwind is loaded via `@tailwindcss/vite` in `astro.config.mjs`.

### Rules

- Use Tailwind utility classes directly in component templates via `class` attributes.
- For component-specific overrides, use `<style>` blocks scoped to the `.astro` component.
- Use `:global()` selectors within scoped `<style>` blocks only when targeting rendered Markdown content.

### Style architecture

| Path                    | Purpose                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/styles/global.css` | Entry point — imports Tailwind, registers the typography plugin, defines theme tokens and base styles |

### Colors

Defined as CSS custom properties (Tailwind `@theme` tokens) in `src/styles/global.css`:

```css
--color-dark: #1c1b1b;
--color-dark-01: #222020;
--color-dark-02: #2f2f2f;
--color-light: #dadada;
--color-light-01: #656565;
--color-green: #00cd81;
```

### Font

Open Sans, sans-serif — base size 18px, line-height 1.45em.

### Code highlighting

Shiki (Astro built-in) with the `material-theme-darker` theme, configured in `astro.config.mjs` under `markdown.shikiConfig`.

## Content Authoring

Blog posts are Markdown files located at `src/content/posts/YYYY-MM-DD-slug/index.md`. They are loaded as a content collection via the `glob` loader defined in `src/content/config.ts`.

### Content collection config

The posts collection is defined in `src/content/config.ts` with a Zod schema that validates all frontmatter fields:

```typescript
const posts = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    published: z.boolean(),
    minutesRead: z.number().optional()
  })
})
```

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

| Field         | Type     | Notes                                                      |
| ------------- | -------- | ---------------------------------------------------------- |
| `slug`        | string   | Must start and end with `/`                                |
| `title`       | string   | Post title                                                 |
| `date`        | string   | ISO 8601 datetime                                          |
| `description` | string   | Used in meta tags and post listings                        |
| `tags`        | string[] | Lowercase, used for tag pages                              |
| `published`   | boolean  | Set `false` to exclude from all `getCollection()` queries  |
| `minutesRead` | number?  | Injected automatically by the `remark-reading-time` plugin |

### Images

Co-locate images in the post directory alongside `index.md`. Reference them with relative Markdown image syntax. Astro handles copying them to the build output.

## Testing

No test framework or tests currently exist in this project.

## CI / CD

- **PR checks**: `.github/workflows/pr-check.yml` — runs `pnpm run build` on every pull request.
- **Deployment**: `.github/workflows/astro.yml` — builds and deploys to GitHub Pages on push to `main`.
- **Dependency updates**: `.github/dependabot.yml` — weekly npm update PRs.
