<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$lib';
	export let user: User;
	const logout = () => {
		fetch('/auth/logout');
		window.location.href = '/auth/login';
	};
</script>

<div class="bg-black p-4 text-white">
	<div class="flex items-center gap-4 justify-between">
		<ul class="flex gap-4">
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/chat">Chat</a>
			</li>
		</ul>
		<div class="flex gap-4">
			<img class="w-8 rounded-full" src={user.img_url} alt={user.handle} />
			<button class="rounded border border-white px-1" on:click={logout}>Logout</button>
		</div>
	</div>
</div>
