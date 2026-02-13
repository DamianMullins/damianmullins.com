import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

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

export const collections = { posts }
