import { defineCollection, z, type CollectionEntry } from 'astro:content';

// Define a linear gradient type
const linearGradient = z.string().regex(/^linear-gradient\((.+)\)$/);

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    color: linearGradient,
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    color: linearGradient,
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects };
