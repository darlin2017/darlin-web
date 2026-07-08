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

const staff = defineCollection({
  loader: file('src/content/staff/staff.json'),
  schema: z.object({
    name: z.string(),
    salon: z.enum(['darlin', 'feel-like-makin-love', 'edie']),
    position: z.string(),
    instagram: z.string(),
    photos: z
      .array(
        z.object({
          src: z.string(),
          width: z.number(),
          height: z.number(),
        })
      )
      .length(3),
  }),
});

const menu = defineCollection({
  loader: file('src/content/menu/menu.json'),
  schema: z.object({
    category: z.enum(['Cut', 'Single Color', 'Double Process Color', 'Perm', 'Treatment', 'Other']),
    menuName: z.string(),
    price: z.string(),
    note: z.array(z.string()).optional(),
    sortOrder: z.number(),
  }),
});

export const collections = { blog, access, staff, menu };
