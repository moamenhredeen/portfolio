// @ts-check
import { defineConfig } from 'astro/config';

import remarkGithubAlerts from 'remark-github-alerts'
import solidJs from '@astrojs/solid-js';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      },
      remarkPlugins: [
          remarkGithubAlerts
      ]
    },

  integrations: [solidJs(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});