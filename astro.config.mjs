// @ts-check
import { defineConfig } from 'astro/config';

import remarkGithubAlerts from 'remark-github-alerts'
import vue from '@astrojs/vue';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDemoteHeadings from './src/plugins/remark-demote-headings.mjs';
import rehypeFigures from './src/plugins/rehype-figures.mjs';
import rehypeLeadIn from './src/plugins/rehype-lead-in.mjs';
import rehypeTableCaptions from './src/plugins/rehype-table-captions.mjs';
import rehypeCitation from 'rehype-citation';
import rehypeLinkifyBib from './src/plugins/rehype-linkify-bib.mjs';
import transformerListingCaption from './src/plugins/shiki-listing-caption.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://moamenhredeen.me',
  markdown: {
      shikiConfig: {
        // Dual themes: each token carries a light colour inline and its dark
        // colour in a `--shiki-dark` custom property. The dark palette is
        // activated by CSS in `global.css` (screen-only, so print stays light).
        themes: {
          light: 'gruvbox-light-hard',
          dark: 'gruvbox-dark-hard',
        },
        transformers: [transformerListingCaption()],
      },
      remarkPlugins: [
          remarkGithubAlerts,
          remarkDemoteHeadings,
          remarkMath,
      ],
      rehypePlugins: [
          rehypeLeadIn,
          rehypeFigures,
          rehypeTableCaptions,
          rehypeKatex,
          [rehypeCitation, {
              // Shared BibTeX database; only cited keys are rendered.
              bibliography: 'references.bib',
              // Numeric, LaTeX-like citations ([1], [2]) listed in citation order.
              csl: 'vancouver',
              // Hyperlink each [n] marker to its bibliography entry.
              linkCitations: true,
          }],
          rehypeLinkifyBib,
      ],
      remarkRehype: {
          footnoteLabel: 'Notes',
          footnoteBackLabel: 'Back to reference {1}',
      }
    },

  integrations: [vue(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
