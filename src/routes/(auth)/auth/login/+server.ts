import { figma } from '$lib/server/arctic';
import { generateState } from 'arctic';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	cookies.delete('seeded', {
		secure: true,
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10
	});
	cookies.set('state', state, {
		secure: true,
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10
	});
	const url: URL = await figma.createAuthorizationURL(state, [
		'files:read',
		'file_comments:write',
		'file_variables:write',
		'file_dev_resources:write',
		'webhooks:write'
	]);
	return json({ uri: url.href });
};
