import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('access_token', {
		path: '/',
		secure: true,
		httpOnly: true
	});
	cookies.delete('refresh_token', {
		path: '/',
		secure: true,
		httpOnly: true
	});
	return new Response();
};
