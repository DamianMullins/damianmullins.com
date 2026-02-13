import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_URL } from '@/consts'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('posts', ({ data }) => data.published)
  ).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return rss({
    title: 'RSS Feed for Damian Mullins',
    description: SITE_TITLE,
    site: context.site?.toString() ?? SITE_URL,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      link: post.data.slug,
      pubDate: new Date(post.data.date),
      categories: post.data.tags
    }))
  })
}
