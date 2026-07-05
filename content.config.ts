import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        topics: z.array(z.string()),
        date: z.coerce.date(),
        slug: z.string(),
        img: z.string().url(),
        draft: z.boolean().default(false)
      })
    })
  }
})
