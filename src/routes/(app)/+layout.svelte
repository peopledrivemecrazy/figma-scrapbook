<script>
	import Navbar from '$lib/Navbar.svelte';
	export let data;
</script>

{#if data.user}
	<Navbar user={data.user} />

	<main>
		<slot />
	</main>
{/if}

<style lang="postcss">
	main {
		@apply max-w-xl mx-auto p-4;
	}
</style>
