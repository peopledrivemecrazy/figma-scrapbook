<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	import ChatInput from './ChatInput.svelte';
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

<div class="fixed inset-y-0 z-50 mt-[64px] flex w-72 flex-col text-white">
	<div class="no-scrollbar flex grow flex-col gap-y-5 overflow-y-auto bg-black">
		<div>
			<ul>
				{#each data.userList as { user, id }}
					<li>
						<a
							class="flex w-full gap-4 p-2 hover:bg-yellow-800"
							href="/chat/{id}"
							class:bg-yellow-800={activeLink === `/chat/${id}`}
						>
							<img src={user.img_url} alt="{user.handle}'s avatar" class="w-8 rounded-full" />
							<span> {user.handle}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="bg-black/80 p-4 text-white">
		<div class="flex items-center gap-2">
			<img src={data.user.img_url} alt={data.user.email} class="w-8 rounded-full" />
			<p>
				{data.user.handle}
			</p>
		</div>
	</div>
</div>
<div class="pl-72 pt-[64px]">
	<div class="chatContent flex h-full flex-col overflow-y-scroll">
		<slot />
		<form class="fixed bottom-2 left-0 right-0 flex pl-72">
			<ChatInput on:submit={handleSubmit} bind:input />
		</form>
	</div>
</div>
