import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/pages/blog'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string())
    })
})

export const collections = { posts }
