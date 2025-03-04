
// import type {LoadEvent} from "@sveltejs/kit";
// import type {Post} from "./types";
//
// export function load(event: LoadEvent) {
//     const paths = import.meta.glob('./posts/*.md', {eager: true});
//     const posts: Post[] = [];
//     for (const path in paths) {
//         const file = paths[path];
//         const slug = path.split('/').at(-1)?.replace('.md', '');
//         if (file && typeof file === 'object' && 'metadata' in file && slug) {
//             const metadata = file.metadata as Omit<Post, 'slug'>
//             const post = { ...metadata, slug } satisfies Post
//             post.published && posts.push(post)
//         }
//     }
//     return {posts};
// }
