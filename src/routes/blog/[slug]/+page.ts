import { error } from '@sveltejs/kit';

export async function load({params}) {
	try{
		const post = await import(`./../../../posts/${params.slug}.md`);
		return {
			meta: post.metadata,
			content: post.default,
		};
	}catch (err){
		console.log(err);
		throw error(404, `could not find post: ${params.slug}`);
	}
}