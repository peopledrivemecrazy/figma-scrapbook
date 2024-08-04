import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
export const ssr = false;
export const actions = {
	send: async ({ request }) => {
		const body = await request.json();
		console.log(body);
	}
};
