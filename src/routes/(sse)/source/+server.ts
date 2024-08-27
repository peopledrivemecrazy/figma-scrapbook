import { BASE_URL, FILE_KEY } from '$env/static/private';
import { produce } from 'sveltekit-sse';
import {
	type CanvasNode,
	type GetFileResponse,
	type HasTextSublayerTrait
} from '@figma/rest-api-spec';

function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}

export function POST({ fetch }) {
	return produce(async function start({ emit }) {
		const condition = true;
		while (condition) {
			const response = await fetch(`${BASE_URL}/files/${FILE_KEY}`);
			const file = (await response.json()) as GetFileResponse;
			console.log(file);
			// const [target] = (file as GetFileResponse).document.children.flatMap((e) => e.children);
			// const children = (target as unknown as CanvasNode).children;
			// const todo = children.flatMap((e) => (e as HasTextSublayerTrait).characters);
			const { error } = emit('message', JSON.stringify({}));

			if (error) {
				return;
			}
			await delay(2000);
		}
	});
}
