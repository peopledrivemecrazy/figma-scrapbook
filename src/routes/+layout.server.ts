import type { LayoutServerLoad } from './$types';
import { FILE_KEY } from '$env/static/private';
import type { Comment, Vector } from '@figma/rest-api-spec';

export const load = (async ({ locals }) => {
	const comments = (await seedData(locals)) as Comment[];
	return {
		user: locals.user,
		comments
	};
}) satisfies LayoutServerLoad;

const seedData = async (locals: App.Locals) => {
	if (!locals.user || !locals.user.id) return [];

	const API = locals.figma();
	let result = await API.getComments(FILE_KEY);

	let targetOffset = 0;

	if (result.comments.length) {
		const firstComment = result.comments[0];
		const firstCommentY = (firstComment.client_meta as Vector).y || 0;
		targetOffset = firstCommentY;
	}

	const ifUserExists = result.comments.some((e) => e.user.id === locals.user!.id);
	if (!ifUserExists) {
		await API.postComment(FILE_KEY, 'Profile', {
			x: 200,
			y: targetOffset
		});

		result = await API.getComments(FILE_KEY);
	}

	return result.comments;
};
