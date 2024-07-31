import type { User } from '$lib';
import { refreshSession } from '$lib/server/arctic';
import { redirect, type Cookies, type Handle, type HandleFetch } from '@sveltejs/kit';

const COOKIE_OPTIONS = {
	path: '/',
	secure: true,
	httpOnly: true
};

const setCookies = (
	cookies: Cookies,
	tokens: {
		access_token: string;
		refresh_token: string;
		expires_in: number;
	}
) => {
	cookies.set('access_token', tokens.access_token, {
		...COOKIE_OPTIONS,
		maxAge: tokens.expires_in
	});
	cookies.set('refresh_token', tokens.refresh_token, {
		...COOKIE_OPTIONS,
		maxAge: tokens.expires_in
	});
};
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
const refreshTokens = async (cookies: Cookies, currentRefreshToken: string) => {
	try {
		const tokens = await refreshSession(currentRefreshToken);
		if (tokens) {
			setCookies(cookies, tokens);
			return tokens;
		}
	} catch (error) {
		console.error(error);
	}
	return null;
};

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, url, locals } = event;
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');

	if (url.pathname === '/auth') {
		return await resolve(event);
	}
	if (url.pathname === '/auth/login') {
		return await resolve(event);
	}

	if (!access_token || !refresh_token) {
		return redirect(307, '/auth/login');
	}
	const response = await fetch('https://api.figma.com/v1/me', {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});
	const user = (await response.json()) satisfies User;

	locals.access_token = access_token;
	locals.user = user;
	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, event }) => {
	const access_token = event.locals.access_token;
	if (access_token) {
		request.headers.set('Authorization', `Bearer ${access_token}`);
	} else {
		redirect(307, '/auth/login');
	}
	return await fetch(request);
};
