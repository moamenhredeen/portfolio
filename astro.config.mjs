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
import rehypeTableCaptions from './src/plugins/rehype-table-captions.mjs';
import transformerListingCaption from './src/plugins/shiki-listing-caption.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
        theme: 'gruvbox-light-hard',
        transformers: [transformerListingCaption()],
      },
      remarkPlugins: [
          remarkGithubAlerts,
          remarkDemoteHeadings,
          remarkMath,
      ],
      rehypePlugins: [
          rehypeFigures,
          rehypeTableCaptions,
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
