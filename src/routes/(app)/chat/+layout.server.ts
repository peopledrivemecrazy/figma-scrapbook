import type { LayoutServerLoad } from './$types';
export const load = (async ({ parent }) => {
	const { comments } = await parent();
	const userDatas = comments.map((e) => {
		return {
			id: e.id,
			user: e.user
		};
	});
	return {
		userDatas
	};
}) satisfies LayoutServerLoad;
