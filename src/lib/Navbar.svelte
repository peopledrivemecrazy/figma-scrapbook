<script lang="ts">
	import type { User } from '$lib';

	export let user: User;
</script>

<div class="bg-black p-4 text-white">
	<div class="flex gap-4 items-center justify-end">
		<img class="rounded-full w-8" src={user.img_url} alt={user.handle} />
		<button class="border-white border px-1 rounded">Logout</button>
	</div>
</div>
