// @ts-check
import { defineConfig } from 'astro/config';

import remarkGithubAlerts from 'remark-github-alerts'
import vue from '@astrojs/vue';

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

  integrations: [vue(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
