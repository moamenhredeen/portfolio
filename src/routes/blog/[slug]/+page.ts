import { error } from '@sveltejs/kit';

export async function load({params}) {
	try{
		const files = import.meta.glob('../../../posts/**/*.md', { eager: true });
		const file = Object.keys(files).filter(file => file.includes(params.slug));
		if (!file || file.length < 1) {
			throw new Error("not found");
		}
		const post = await import(file[0]);
		return {
			meta: post.metadata,
			content: post.default,
		};
	}catch (err){
		console.log(err);
		throw error(404, `could not find post: ${params.slug}`);
	}
}