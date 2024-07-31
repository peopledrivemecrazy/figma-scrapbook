import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	console.log('hit');
	return new Response("OK");
};
