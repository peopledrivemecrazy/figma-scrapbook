import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { profile } = await parent();
	return redirect(307, `/chat/${profile.id}`);
	return {};
}) satisfies PageServerLoad;
export const ssr = false;
export const actions = {
	send: async ({ request }) => {
		const body = await request.json();
		console.log(body);
	}
};
