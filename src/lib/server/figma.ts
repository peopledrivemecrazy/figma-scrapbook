import { BASE_URL, FILE_KEY } from '$env/static/private';

export const likeComment = async (
	comment_id: string,
	token: string,
	fetch: typeof globalThis.fetch
) => {
	const response = await fetch(`${BASE_URL}/files/${FILE_KEY}/comments/${comment_id}/reactions`, {
		method: 'POST',
		body: JSON.stringify({ emoji: ':heart:' }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();
	return result;
};
