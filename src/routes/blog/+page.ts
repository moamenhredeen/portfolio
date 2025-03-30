import type { Post } from './types';

export async function load() {
	const paths = import.meta.glob('../../posts/**/*.md', {eager: true});
	const posts: Post[] = [];
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			if(post.published){
				posts.push(post)
			}
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return {
		posts
	};

	// const files = import.meta.glob('/src/posts/**/*.md', {
	// 		eager: true,
	// 	}
	// );
	//
	// const posts = [];
	// for (const file in files) {
	// 	posts.push({
	// 		url: `blog/${file.split('/').at(-1)?.replace('.md', '')}`,
	// 		...files[file].metadata,
	// 	});
	// }
};