<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;

	import ChatInput from './ChatInput.svelte';
	let input = '';
	const handleSubmit = async () => {
		const response = await fetch('?/send', {
			method: 'POST',
			body: JSON.stringify({ input })
		});
		input = '';
	};
</script>

<div class="flex h-full gap-4">
	<div class="w-72 bg-black text-white">
		<div class="flex h-full flex-col justify-between">
			<div>1</div>

			<div class="flex items-center gap-4 bg-yellow-100/50 p-2">
				<img src={data.user.img_url} alt={data.user.email} class="w-8 rounded-full" />
				<p>
					{data.user.handle}
				</p>
			</div>
		</div>
	</div>
	<div class="relative flex flex-grow flex-col">
		<div class="chatContent flex h-full flex-col">
			<div class="flex-grow overflow-y-auto"></div>
			<form class="absolute bottom-0 left-0 right-0 flex">
				<ChatInput on:submit={handleSubmit} bind:input />
			</form>
		</div>
	</div>
</div>
