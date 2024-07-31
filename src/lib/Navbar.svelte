<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$lib';
	export let user: User;
	const logout = () => {
		fetch('/auth/logout');
		window.location.href = "/auth/login";
	};
</script>

<div class="bg-black p-4 text-white">
	<div class="flex gap-4 items-center justify-end">
		<img class="rounded-full w-8" src={user.img_url} alt={user.handle} />
		<button class="border-white border px-1 rounded" on:click={logout}>Logout</button>
	</div>
</div>
