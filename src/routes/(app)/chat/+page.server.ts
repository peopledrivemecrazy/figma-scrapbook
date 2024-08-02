import { BASE_URL, FILE_KEY } from '$env/static/private';
import type { Comment } from '@figma/rest-api-spec';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${BASE_URL}/files/${FILE_KEY}/comments`);
	const chatList: Comment[] = await response.json();
	return {
		chatList
	};
}) satisfies PageServerLoad;
export const ssr = false;
export const actions = {
	send: async ({ request }) => {
		const body = await request.json();
		console.log(body);
	}
};
