<script lang="ts">
	import type { PageData } from './$types';
	// import { source } from 'sveltekit-sse';

	export let data: PageData;

	
	// $: console.log(data.userDatas);
	// const value = source('/source').select('message');
</script>

<div class="flex-grow overflow-y-auto">
	<p>you have not scraps {':('}</p>
</div>
