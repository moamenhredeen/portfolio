// @ts-check
import { defineConfig } from 'astro/config';

import remarkGithubAlerts from 'remark-github-alerts'
import vue from '@astrojs/vue';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDemoteHeadings from './src/plugins/remark-demote-headings.mjs';
import rehypeFigures from './src/plugins/rehype-figures.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
        theme: 'gruvbox-light-hard',
      },
      remarkPlugins: [
          remarkGithubAlerts,
          remarkDemoteHeadings,
          remarkMath,
      ],
      rehypePlugins: [
          rehypeFigures,
          rehypeKatex,
      ],
      remarkRehype: {
          footnoteLabel: 'Notes',
          footnoteBackLabel: 'Back to reference {1}',
      }
    },

  integrations: [vue(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
