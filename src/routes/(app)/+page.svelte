<script lang="ts">
	import type { CanvasNode, GetFileResponse, HasTextSublayerTrait } from '@figma/rest-api-spec';
	import type { PageData } from './$types';

	import { source } from 'sveltekit-sse';
	const connection = source('/source');

	$: data = connection.select('message').json(function or({ error, raw, previous }) {
		return previous as { todo: string[] };
	});
</script>

<div class="grid h-screen w-screen place-items-center">
	{#if $data?.todo}
		<ul>
			{#each $data.todo as item}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}
</div>
