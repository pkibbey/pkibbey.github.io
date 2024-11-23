import mdx from '@astrojs/mdx';
// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://phineas-dev.github.io',
  integrations: [mdx(), sitemap(), tailwind({ nesting: true }), react()],
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
    minify: true,
    format: 'file',
    assets: 'assets'
  },
});