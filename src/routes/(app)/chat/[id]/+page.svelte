<script lang="ts">
	import type { PageData } from './$types';
	import uEmojiParser from 'universal-emoji-parser';

	export let data: PageData;
</script>

<div class="p-4">
	{#if data.thread.length}
		<ul>
			{#each data.thread as { message, user }}
				<li class="my-2 flex justify-between bg-yellow-400/90 p-2">
					{uEmojiParser.parseToUnicode(message)}
					<div class="flex items-center gap-4">
						<img src={user.img_url} alt="{user.handle}'s avatar" class="w-8 rounded-full" />
						<p>
							{user.handle}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No messages</p>
	{/if}
</div>
