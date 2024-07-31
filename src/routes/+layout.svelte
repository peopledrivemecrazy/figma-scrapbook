<script>
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
	export let data;
</script>

<Navbar user={data.user}/>
<main>
	<slot />
</main>

<style lang="postcss">
	main {
		@apply max-w-xl mx-auto p-4;
	}
</style>
