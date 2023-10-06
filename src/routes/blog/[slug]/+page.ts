import {error} from '@sveltejs/kit'
import type {LoadEvent} from '@sveltejs/kit';

export async function load(event: LoadEvent) {
    try {
        const post = await import(`../posts/${event.params.slug}.md`)
        return {
            content: post.default,
            meta: post.metadata
        }
    } catch (e) {
        throw error(404, `Could not find ${event.params.slug}`)
    }
}
