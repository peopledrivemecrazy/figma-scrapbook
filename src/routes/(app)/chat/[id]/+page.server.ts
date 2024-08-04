import { FILE_KEY } from '$env/static/private';
import { likeComment } from '$lib/server/figma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { id } = params;
	const allComments = await parent();
	const thread = allComments.comments.filter((e) => e.parent_id === id);
	return { id, thread };
}) satisfies PageServerLoad;
export const actions = {
	send: async ({ request, locals, params }) => {
		const { id } = params;

		const body = await request.json();

		const commentToThread = await locals
			.figma()
			.postComment(FILE_KEY, body.input, { x: 0, y: 0 }, id);

		return {
			thread: commentToThread
		};
	},
	like: async ({ request, locals, fetch }) => {
		const formData = await request.formData();
		const comment_id = formData.get('comment_id') as string;
		if (!locals.access_token || !comment_id) return fail(400, { message: 'Something went wrong' });
		const r = await likeComment(comment_id, locals.access_token, fetch);
		return { r };
	}
};
