import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
  return function (tree: unknown, { data }: { data: Record<string, unknown> }) {
    const textOnPage = toString(tree as import('mdast').Root)
    const readingTime = getReadingTime(textOnPage)
    data.astro = data.astro || {}
    ;(data.astro as Record<string, unknown>).frontmatter =
      (data.astro as Record<string, unknown>).frontmatter || {}
    ;(
      (data.astro as Record<string, unknown>).frontmatter as Record<
        string,
        unknown
      >
    ).minutesRead = Math.max(1, Math.round(readingTime.minutes))
  }
}
