<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let input = '';
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault();
		}
		if (event.key === 'Enter') {
			dispatch('submit');
		}
	}
</script>

<textarea
	name="chatInput"
	rows="4"
	class="w-full rounded border border-black mx-4 p-2"
	on:keydown={handleKeydown}
	enterkeyhint="send"
	bind:value={input}
	placeholder="Write a message"
/>
