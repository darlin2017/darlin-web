import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    eyecatch: z.string(),
    author: z.string(),
  }),
});

const access = defineCollection({
  loader: file('src/content/access/stores.json'),
  schema: z.object({
    storeName: z.string(),
    photos: z.array(
      z.object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
      })
    ),
    postalCode: z.string(),
    address: z.string(),
    mapUrl: z.string(),
    hours: z.string(),
    closedDays: z.string(),
    phone: z.string(),
    reserveUrl: z.string(),
  }),
});

export const collections = { blog, access };
