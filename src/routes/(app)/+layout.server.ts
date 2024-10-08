import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/auth/login');
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
