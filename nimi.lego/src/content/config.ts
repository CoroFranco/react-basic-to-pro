import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
    price: z.coerce.number(),
    category: z.string()
  })
})

export const collections = { products }
