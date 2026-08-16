// @ts-check
import { defineConfig } from 'astro/config';

import remarkGithubAlerts from 'remark-github-alerts'
import solidJs from '@astrojs/solid-js';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import remarkDemoteHeadings from './src/plugins/remark-demote-headings.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
        theme: 'gruvbox-light-hard',
      },
      remarkPlugins: [
          remarkGithubAlerts,
          remarkDemoteHeadings,
      ]
    },

  integrations: [solidJs(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
