import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({cookies, url}) => {
    const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const code_verifier = cookies.get('code_verifier');
    if (!code || !state || !code_verifier) {
		throw new Error('Invalid request');
	}



    return new Response();
};