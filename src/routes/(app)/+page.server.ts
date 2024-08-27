import { BASE_URL, FILE_KEY } from '$env/static/private';
import type { GetFileResponse } from '@figma/rest-api-spec';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${BASE_URL}/files/${FILE_KEY}`);
	const file = (await response.json()) as GetFileResponse;
	return { file };
}) satisfies PageServerLoad;
