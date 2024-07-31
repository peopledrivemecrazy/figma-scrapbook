import { figma } from '$lib/server/arctic';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	if (!code || !state) {
		throw new Error('Invalid request');
	}
	try {
		const tokens = await figma.validateAuthorizationCode(code);
		const access_token = tokens.accessToken();
		const refresh_token = tokens.refreshToken();
		const expires_in = tokens.accessTokenExpiresInSeconds();
		cookies.set('access_token', access_token, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: expires_in
		});
		cookies.set('refresh_token', refresh_token, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: expires_in
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
