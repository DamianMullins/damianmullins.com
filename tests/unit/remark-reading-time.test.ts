import { describe, it, expect } from 'vitest'
import { remarkReadingTime } from '@/plugins/remark-reading-time'

function createTree(text: string) {
  return {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, value: text }]
      }
    ]
  }
}

function createFile() {
  return { data: {} } as { data: Record<string, unknown> }
}

describe('remarkReadingTime', () => {
  const plugin = remarkReadingTime()

  it('sets minutesRead to 1 for very short content', () => {
    const tree = createTree('Hello world')
    const file = createFile()

    plugin(tree, file)

    const frontmatter = (file.data.astro as Record<string, unknown>)
      .frontmatter as Record<string, unknown>
    expect(frontmatter.minutesRead).toBe(1)
  })

  it('calculates reading time for longer content', () => {
    // ~500 words ≈ 2-3 minutes
    const words = Array(500).fill('word').join(' ')
    const tree = createTree(words)
    const file = createFile()

    plugin(tree, file)

    const frontmatter = (file.data.astro as Record<string, unknown>)
      .frontmatter as Record<string, unknown>
    expect(frontmatter.minutesRead).toBeGreaterThanOrEqual(2)
  })

  it('always returns at least 1 minute', () => {
    const tree = createTree('')
    const file = createFile()

    plugin(tree, file)

    const frontmatter = (file.data.astro as Record<string, unknown>)
      .frontmatter as Record<string, unknown>
    expect(frontmatter.minutesRead).toBeGreaterThanOrEqual(1)
  })

  it('initialises astro.frontmatter when not present', () => {
    const tree = createTree('Some content')
    const file = createFile()

    plugin(tree, file)

    expect(file.data.astro).toBeDefined()
    expect(
      (file.data.astro as Record<string, unknown>).frontmatter
    ).toBeDefined()
  })
})
