<script lang="ts">
	import type { CanvasNode, ComponentNode, HasTextSublayerTrait } from '@figma/rest-api-spec';
	import type { PageData } from './$types';

	export let data: PageData;

	const [target] = data.file.document.children.flatMap((e) => e.children);
	const children = (target as unknown as CanvasNode).children;
	const todo = children.flatMap((e) => (e as HasTextSublayerTrait).characters);
</script>

<div class="grid h-screen place-items-center">
	<ul>
		{#each todo as item}
			<li>{item}</li>
		{/each}
	</ul>
</div>
