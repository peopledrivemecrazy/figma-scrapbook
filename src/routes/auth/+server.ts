import { figma } from '$lib/server/arctic';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	console.log({ code, state });
	if (!code || !state) {
		throw new Error('Invalid request');
	}
	try {
		const tokens = await figma.validateAuthorizationCode(code);
		console.log(tokens);
		const access_token = tokens.accessToken();
		const refresh_token = tokens.refreshToken();
		const expiresIn = tokens.accessTokenExpiresInSeconds();
		cookies.set('access_token', access_token, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: expiresIn
		});
		cookies.set('refreshToken', refresh_token, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: expiresIn
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			// Invalid authorization code, credentials, or redirect URI
			// const code = e.code;
			// ...
			console.log(e);
		}
		if (e instanceof ArcticFetchError) {
			// Failed to call `fetch()`
			// const cause = e.cause;
			// ...
			console.log(e);
		}
		// Parse error
	}
	return redirect(307, '/');
};
