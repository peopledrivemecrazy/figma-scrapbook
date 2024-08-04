import type { PageServerLoad } from './$types';

export const load = (async () => {}) satisfies PageServerLoad;

export const ssr = false;
export const actions = {
	send: async ({ request }) => {
		const body = await request.json();
		console.log(body);
	}
};
