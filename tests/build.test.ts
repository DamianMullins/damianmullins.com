import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import * as cheerio from 'cheerio'

const DIST = resolve(__dirname, '..', 'dist')

/**
 * These tests run against the built output in dist/.
 * Run `pnpm run build` before executing them.
 */
describe('build output', () => {
  beforeAll(() => {
    if (!existsSync(DIST)) {
      throw new Error(
        'dist/ directory not found — run `pnpm run build` before running tests.'
      )
    }
  })

  it('dist/ directory exists', () => {
    expect(existsSync(DIST)).toBe(true)
  })

  describe('pages', () => {
    it('has an index page', () => {
      expect(existsSync(resolve(DIST, 'index.html'))).toBe(true)
    })

    it('has a 404 page', () => {
      expect(existsSync(resolve(DIST, '404.html'))).toBe(true)
    })

    it('has a tags index page', () => {
      expect(existsSync(resolve(DIST, 'tags', 'index.html'))).toBe(true)
    })

    it('has an RSS feed', () => {
      const rssPath = resolve(DIST, 'rss.xml')
      expect(existsSync(rssPath)).toBe(true)

      const content = readFileSync(rssPath, 'utf-8')
      expect(content).toContain('<rss')
      expect(content).toContain('<item>')
    })

    it('has a sitemap', () => {
      expect(existsSync(resolve(DIST, 'sitemap-index.xml'))).toBe(true)
    })
  })

  describe('post pages', () => {
    it('generates an HTML page for each published post', () => {
      const postDirs = readdirSync(
        resolve(__dirname, '..', 'src', 'content', 'posts')
      )

      // Read each post's frontmatter to get slug and published status
      for (const dir of postDirs) {
        const mdPath = resolve(
          __dirname,
          '..',
          'src',
          'content',
          'posts',
          dir,
          'index.md'
        )
        if (!existsSync(mdPath)) continue

        const content = readFileSync(mdPath, 'utf-8')
        const frontmatter = content.split('---')[1]
        if (!frontmatter) continue

        const publishedMatch = frontmatter.match(/published:\s*(true|false)/)
        const isPublished = publishedMatch?.[1] === 'true'
        if (!isPublished) continue

        const slugMatch = frontmatter.match(
          /slug:\s*['"]?\/?([^'"\/\n]+)\/?['"]?/
        )
        const slug = slugMatch?.[1]
        if (!slug) continue

        const pagePath = resolve(DIST, slug, 'index.html')
        expect(existsSync(pagePath), `Missing page for post: ${slug}`).toBe(
          true
        )
      }
    })
  })

  describe('index page content', () => {
    let $: cheerio.CheerioAPI

    beforeAll(() => {
      const html = readFileSync(resolve(DIST, 'index.html'), 'utf-8')
      $ = cheerio.load(html)
    })

    it('has a page title', () => {
      expect($('title').text()).toBeTruthy()
    })

    it('has a meta description', () => {
      expect($('meta[name="description"]').attr('content')).toBeTruthy()
    })

    it('has a favicon link', () => {
      expect($('link[rel="icon"]').length).toBeGreaterThan(0)
    })

    it('has a manifest link', () => {
      expect($('link[rel="manifest"]').attr('href')).toBe(
        '/manifest.webmanifest'
      )
    })

    it('has Open Graph or meta description for SEO', () => {
      const description = $('meta[name="description"]').attr('content')
      expect(description).toBeTruthy()
      expect(description!.length).toBeGreaterThan(10)
    })

    it('includes post listings', () => {
      // Posts should be rendered as links on the homepage
      const links = $('a[href]')
        .toArray()
        .map(el => $(el).attr('href'))
        .filter(
          href =>
            href &&
            href.startsWith('/') &&
            href !== '/' &&
            !href.startsWith('/tags')
        )
      expect(links.length).toBeGreaterThan(0)
    })
  })

  describe('post page content', () => {
    let $: cheerio.CheerioAPI

    beforeAll(() => {
      // Use the first published post we can find
      const postDirs = readdirSync(resolve(DIST)).filter(d => {
        const indexPath = resolve(DIST, d, 'index.html')
        if (!existsSync(indexPath)) return false
        if (['tags', '_astro', 'icons'].includes(d)) return false
        return true
      })

      const postDir = postDirs[0]
      if (!postDir) throw new Error('No post pages found in dist/')
      const html = readFileSync(resolve(DIST, postDir, 'index.html'), 'utf-8')
      $ = cheerio.load(html)
    })

    it('has a unique page title (not just the site title)', () => {
      const title = $('title').text()
      expect(title).toContain('—')
    })

    it('has an h1 heading', () => {
      expect($('h1').length).toBeGreaterThan(0)
    })

    it('has post content with prose styling', () => {
      expect($('.prose').length).toBeGreaterThan(0)
    })

    it('has a date element', () => {
      expect($('time').length).toBeGreaterThan(0)
    })
  })
})
