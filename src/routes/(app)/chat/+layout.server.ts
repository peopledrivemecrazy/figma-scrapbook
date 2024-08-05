import { FILE_KEY } from '$env/static/private';
import type { Vector } from 'figma-api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const comments = await seedData(locals);
	const userList = comments
		.map((e) => {
			return {
				id: e.id,
				user: e.user,
				parent: e.parent_id || null
			};
		})
		.filter((e) => e.parent === null);
	const [profile] = userList.filter((e) => e.user.id === locals.user?.id);
	return { comments, userList, profile };
}) satisfies LayoutServerLoad;

const seedData = async (locals: App.Locals) => {
	if (!locals.user || !locals.user.id) return [];

	const API = locals.figma();
	let result = await API.getComments(FILE_KEY);

	const ifUserExists = result.comments.some((e) => e.user.id === locals.user!.id);
	if (!ifUserExists) {
		if (result.comments.length > 0) {
			const [firstComment] = result.comments;
			const totalComments = result.comments.length;
			const offset = 50;
			const firstCommentY = (firstComment.client_meta as Vector).y || 0;
			await API.postComment(FILE_KEY, 'Profile', {
				x: 0,
				y: firstCommentY + offset * totalComments
			});
		}

		result = await API.getComments(FILE_KEY);
	}
	return result.comments;
};
