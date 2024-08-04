import { FILE_KEY } from '$env/static/private';
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
	}
};
