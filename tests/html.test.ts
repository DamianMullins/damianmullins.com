import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import * as cheerio from 'cheerio'

const DIST = resolve(__dirname, '..', 'dist')

function getHtmlFiles(): string[] {
  const files: string[] = []

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory() && entry.name !== '_astro') {
        walk(full)
      } else if (entry.name === 'index.html') {
        files.push(full)
      }
    }
  }

  // Include root index.html and 404.html
  if (existsSync(resolve(DIST, 'index.html'))) files.push(resolve(DIST, 'index.html'))
  if (existsSync(resolve(DIST, '404.html'))) files.push(resolve(DIST, '404.html'))

  walk(DIST)
  return [...new Set(files)]
}

describe('HTML quality', () => {
  let htmlFiles: string[] = []

  beforeAll(() => {
    if (!existsSync(DIST)) {
      throw new Error('dist/ not found — run `pnpm run build` first.')
    }
    htmlFiles = getHtmlFiles()
  })

  it('found HTML files to validate', () => {
    expect(htmlFiles.length).toBeGreaterThan(0)
  })

  describe('every page', () => {
    it('has a <title> element', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        expect($('title').text(), `Missing title in ${file}`).toBeTruthy()
      }
    })

    it('has a <meta name="description"> tag', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        const desc = $('meta[name="description"]').attr('content')
        expect(desc, `Missing meta description in ${file}`).toBeTruthy()
      }
    })

    it('has a lang attribute on <html>', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        expect($('html').attr('lang'), `Missing lang in ${file}`).toBe('en')
      }
    })

    it('has a <meta charset> tag', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        const charset = $('meta[charset]').attr('charset')
        expect(charset?.toLowerCase(), `Missing charset in ${file}`).toBe('utf-8')
      }
    })

    it('has a viewport meta tag', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        const viewport = $('meta[name="viewport"]').attr('content')
        expect(viewport, `Missing viewport in ${file}`).toBeTruthy()
      }
    })

    it('all images have alt attributes', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        $('img').each((_, el) => {
          const alt = $(el).attr('alt')
          expect(alt, `Image missing alt attribute in ${file}: ${$(el).attr('src')}`).toBeDefined()
        })
      }
    })

    it('no broken internal links (href targets exist in dist)', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        $('a[href]').each((_, el) => {
          const href = $(el).attr('href')
          if (!href) return
          // Only check internal links
          if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('#')) return

          // Normalise path
          const cleanHref = href.split('#')[0].split('?')[0]
          if (!cleanHref) return

          // Check if target exists in dist
          let target: string
          if (cleanHref.endsWith('/')) {
            target = resolve(DIST, cleanHref.slice(1), 'index.html')
          } else if (cleanHref.endsWith('.html')) {
            target = resolve(DIST, cleanHref.slice(1))
          } else {
            // Could be a file like /rss.xml or /manifest.webmanifest
            target = resolve(DIST, cleanHref.slice(1))
            if (!existsSync(target)) {
              target = resolve(DIST, cleanHref.slice(1), 'index.html')
            }
          }

          expect(existsSync(target), `Broken link in ${file}: ${href}`).toBe(true)
        })
      }
    })

    it('heading hierarchy is valid (no skipped levels)', () => {
      for (const file of htmlFiles) {
        const $ = cheerio.load(readFileSync(file, 'utf-8'))
        const headings = $('h1, h2, h3, h4, h5, h6')
          .toArray()
          .map(el => parseInt(el.tagName.replace('h', ''), 10))

        if (headings.length === 0) continue

        // First heading should be h1
        expect(headings[0], `First heading is not h1 in ${file}`).toBe(1)

        // No heading should skip more than one level
        for (let i = 1; i < headings.length; i++) {
          const diff = headings[i] - headings[i - 1]
          expect(
            diff <= 1,
            `Heading level skipped from h${headings[i - 1]} to h${headings[i]} in ${file}`
          ).toBe(true)
        }
      }
    })
  })
})
