import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import sentry from '@sentry/astro'
import { remarkReadingTime } from './src/plugins/remark-reading-time'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  site: 'https://www.damianmullins.com',
  trailingSlash: 'always',
  compressHTML: true,
  vite: {
    build: {
      sourcemap: false
    },
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(),
    sentry({
      sourceMapsUploadOptions: {
        enabled: false
      }
    })
  ],
  markdown: {
    processor: unified(),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'material-theme-darker'
      }
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug]
  }
})
