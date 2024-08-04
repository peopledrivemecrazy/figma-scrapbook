import type { RequestHandler } from './$types';
import { produce } from 'sveltekit-sse';

export const POST: RequestHandler = async () => {
	return produce(async function start({ emit }) {
		const cond = true;
		while (cond) {
			const { error } = emit('message', `the time is ${Date.now()}`);
			if (error) {
				return;
			}
			await delay(5000);
		}
	});
};

function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}
