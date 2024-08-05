import { FILE_KEY } from '$env/static/private';
import type { Vector } from 'figma-api';
import type { LayoutServerLoad } from './$types';
import type { Cookies } from '@sveltejs/kit';
import type { Comment } from 'figma-api/lib/api-types';

export const load = (async ({ locals, cookies }) => {
	const isSeeded = cookies.get('seeded');
	let comments: Comment[] = [];
	if (isSeeded && comments.length) {
		comments = await getCachedComments();
	} else {
		comments = await seedData(locals, cookies);
	}
	const userList = comments
		.map((e) => {
			return {
				id: e.id,
				user: e.user,
				parent: e.parent_id || null
			};
		})
		.filter((e) => e.parent === null);

	const [profile] = userList.filter((e) => e.user.id === locals.user!.id);

	userList.filter((e) => e !== profile);

	return { comments, userList: userList.filter((e) => e !== profile), profile };
}) satisfies LayoutServerLoad;

let cachedComments: Comment[] = [];

const getCachedComments = async () => {
	return cachedComments;
};

const setCachedComments = (comments: Comment[]) => {
	cachedComments = comments;
};

const seedData = async (locals: App.Locals, cookies: Cookies) => {
	if (!locals.user || !locals.user.id) return [];

	const now = new Date();
	cookies.set('seeded', String(now), {
		path: '/',
		sameSite: true,
		httpOnly: true,
		maxAge: 300
	});

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

	setCachedComments(result.comments);
	return result.comments;
};
