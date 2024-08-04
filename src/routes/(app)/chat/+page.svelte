<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;

	import ChatInput from './ChatInput.svelte';
	let input = '';
	const handleSubmit = async () => {
		const response = await fetch('?/send', {
			method: 'POST',
			body: JSON.stringify({ input })
		});
		input = '';
	};
</script>

<div class="flex-grow overflow-y-auto"></div>
