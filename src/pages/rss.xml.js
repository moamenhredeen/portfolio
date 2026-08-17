import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const posts = (await getCollection("posts")).sort(
        (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
    );

    return rss({
        title: "Moamen Hredeen",
        description: "Technical blog posts and notes by Moamen Hredeen.",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/blog/${post.id}/`,
            categories: post.data.tags,
        })),
    });
}
