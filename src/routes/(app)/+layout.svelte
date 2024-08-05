<script>
	import Navbar from '$lib/Navbar.svelte';
	export let data;
</script>

<svelte:head>
	<title>What's this book?</title>
</svelte:head>
{#if data.user}
	<Navbar user={data.user} />

	<main>
		<slot />
	</main>
{/if}

<style lang="postcss">
	main {
		@apply mx-auto h-[calc(100vh-64px)];
	}
</style>
