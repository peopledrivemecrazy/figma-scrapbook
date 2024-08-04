import { FILE_KEY } from '$env/static/private';
import type { FrameOffset } from 'figma-api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const comments = await seedData(locals);
	const userList = comments.map((e) => {
		return {
			id: e.id,
			user: e.user
		};
	});
	return { comments, userList };
}) satisfies LayoutServerLoad;

const seedData = async (locals: App.Locals) => {
	if (!locals.user || !locals.user.id) return [];

	const API = await locals.figma();
	let result = await API.getComments(FILE_KEY);

	const ifUserExists = result.comments.some((e) => e.user.id === locals.user!.id);
	if (!ifUserExists) {
		if (result.comments.length > 0) {
			const [firstComment] = result.comments;
			const totalComments = result.comments.length;
			const offset = 50;
			const firstCommentY = (firstComment.client_meta as FrameOffset).node_offset.y || 0;
			await API.postComment(FILE_KEY, 'Profile', {
				x: 0,
				y: firstCommentY + offset * totalComments
			});
		}

		const whoAmI = await API.getMe();
		await API.postComment(FILE_KEY, JSON.stringify(whoAmI), { x: 0, y: 0 }, 'USER_DB');

		result = await API.getComments(FILE_KEY);
	}

	return result.comments;
};
