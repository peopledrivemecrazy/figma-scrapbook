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
		@apply mx-auto h-[calc(100vh-64px)] p-4;
	}
</style>
