import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
    loader: glob({
        pattern: [
            '**/*.{md,mdx}',
            "!**/_attachments/**",
            "!**/*.excalidraw.md",
            ".obsidian",
            ".trash",
        ],
        base: './src/pages/blog'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date().optional(),
        author: z.string().optional(),
        status: z.string().optional(),
        tags: z.array(z.string())
    })
})

export const collections = { posts }
