import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'

const POSTS_DIR = resolve(__dirname, '..', 'src', 'content', 'posts')

function getPostDirs(): string[] {
  return readdirSync(POSTS_DIR).filter(d =>
    existsSync(join(POSTS_DIR, d, 'index.md'))
  )
}

function parseFrontmatter(md: string): Record<string, string> {
  const raw = md.split('---')[1] ?? ''
  const result: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const match = line.match(/^(\w+):\s*(.+)/)
    if (match) {
      result[match[1]] = match[2].replace(/^['"]|['"]$/g, '').trim()
    }
  }
  return result
}

describe('content validation', () => {
  const postDirs = getPostDirs()

  it('has at least one post', () => {
    expect(postDirs.length).toBeGreaterThan(0)
  })

  describe.each(postDirs)('post: %s', dir => {
    const mdPath = join(POSTS_DIR, dir, 'index.md')
    const content = readFileSync(mdPath, 'utf-8')
    const frontmatter = parseFrontmatter(content)

    it('has a title', () => {
      expect(frontmatter.title).toBeTruthy()
    })

    it('has a valid date', () => {
      expect(frontmatter.date).toBeTruthy()
      expect(new Date(frontmatter.date).toString()).not.toBe('Invalid Date')
    })

    it('has a slug', () => {
      expect(frontmatter.slug).toBeTruthy()
    })

    it('slug starts and ends with /', () => {
      expect(frontmatter.slug.startsWith('/')).toBe(true)
      expect(frontmatter.slug.endsWith('/')).toBe(true)
    })

    it('has a description', () => {
      expect(frontmatter.description).toBeTruthy()
    })

    it('has a published field', () => {
      expect(frontmatter.published).toMatch(/^(true|false)$/)
    })

    it('has tags', () => {
      // Tags are multi-line YAML, check the raw content
      expect(content).toMatch(/tags:\s*\n\s+-/)
    })

    it('has post body content after frontmatter', () => {
      const parts = content.split('---')
      const body = parts.slice(2).join('---').trim()
      expect(body.length).toBeGreaterThan(0)
    })

    it('all referenced images exist', () => {
      const imageRefs = content.match(/!\[.*?\]\(([^)]+)\)/g) ?? []

      for (const ref of imageRefs) {
        const match = ref.match(/!\[.*?\]\(([^)]+)\)/)
        if (!match) continue
        const imagePath = match[1]

        // Skip external URLs
        if (imagePath.startsWith('http')) continue

        const fullPath = join(POSTS_DIR, dir, imagePath)
        expect(existsSync(fullPath), `Missing image: ${imagePath} in ${dir}`).toBe(true)
      }
    })
  })
})
