import type { User } from '$lib';
import { refreshSession } from '$lib/server/arctic';
import { redirect, type Cookies, type Handle, type HandleFetch } from '@sveltejs/kit';
import * as Figma from 'figma-api';

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
	const { cookies, url, locals, route } = event;
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');

	if (route.id?.includes('(webhooks)')) {
		return await resolve(event);
	}

	if (url.pathname === '/auth/login' || route.id?.includes('(auth)')) {
		return await resolve(event);
	}

	if (!access_token) {
		if (refresh_token) {
			const tokens = await refreshTokens(cookies, refresh_token);
			if (tokens) {
				return redirect(307, '/');
			}
		}
		return redirect(307, '/auth/login');
	}

	if (url.pathname === '/auth/login' && access_token) {
		return redirect(307, '/');
	}

	const figmaApi = new Figma.Api({ oAuthToken: access_token });
	event.locals.figma = () => figmaApi;

	let user: User;

	try {
		user = (await event.locals.figma().getMe()) satisfies User;
		locals.user = user;
	} catch (e) {
		console.log(e);
	}

	locals.access_token = access_token;

	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, event }) => {
	const access_token = event.locals.access_token;
	if (access_token) {
		request.headers.set('Authorization', `Bearer ${access_token}`);
	} else {
		throw redirect(307, '/auth/login');
	}
	return await fetch(request);
};
