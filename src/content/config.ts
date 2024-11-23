import { defineCollection, z } from 'astro:content';

// Define a linear gradient type
const linearGradient = z.string().regex(/^linear-gradient\((.+)\)$/);

const postSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  author: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  color: linearGradient,
  tags: z.array(z.string()).default([]),
});

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
});

const projects = defineCollection({
  type: 'content',
  schema: postSchema,
});

export const collections = { blog, projects };
