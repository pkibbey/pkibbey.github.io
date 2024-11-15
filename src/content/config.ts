import { defineCollection, z } from 'astro:content';

// Define a linear gradient type
const linearGradient = z.string().regex(/^linear-gradient\((.+)\)$/);

// Define a hex color type
const hexColor = z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/);

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),  
    color: z.union([linearGradient, hexColor]).optional(),
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
    heroImage: z.string().optional(),
    color: z.union([linearGradient, hexColor]).optional(),
  }),
});

export const collections = { blog, projects };
