import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<'blog'>;

export type ProjectPost = CollectionEntry<'projects'>;

export type Post = BlogPost | ProjectPost;
