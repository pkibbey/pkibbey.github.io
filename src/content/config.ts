import { defineCollection, z } from 'astro:content';

// Define a linear gradient type
const linearGradient = z.string().regex(/^linear-gradient\((.+)\)$/);

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    color: linearGradient,
  }),
});

const projects = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    color: linearGradient,
  }),
});

export const collections = { blog, projects };
