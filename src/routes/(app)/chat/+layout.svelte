<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import ChatInput from './ChatInput.svelte';

	export let data: LayoutData;
	let input = '';

	const handleSubmit = async () => {
		const response = await fetch('?/send', {
			method: 'POST',
			body: JSON.stringify({ input })
		});
		input = '';
	};

	$: activeLink = $page.url.pathname;
</script>

<div class="flex h-full gap-4">
	<div class="w-72 bg-black text-white">
		<div class="flex h-full flex-col justify-between">
			<!-- <div>{$value}</div> -->
			<div>
				<ul class="">
					{#each data.userDatas as { id, user }}
						<li class="p-2 hover:bg-yellow-800" class:bg-yellow-800={activeLink === `/chat/${id}`}>
							<a href="/chat/{id}" class="flex w-full gap-4 py-2">
								<img src={user.img_url} alt={user.handle} class="w-8 rounded-full" />
								<span>
									{user.handle}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
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
			<slot />
			<form class="absolute bottom-0 left-0 right-0 flex">
				<ChatInput on:submit={handleSubmit} bind:input />
			</form>
		</div>
	</div>
</div>
