import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { id } = params;
	const allComments = await parent();
	const thread = allComments.comments.filter((e) => e.parent_id === id);
	return { id, thread };
}) satisfies PageServerLoad;
export const actions = {
	send: async ({ request }) => {
		const body = await request.json();
		console.log(body);
	}
};
