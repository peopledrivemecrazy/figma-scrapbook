<script lang="ts">
    const login = async () => {
		const response = await fetch('/auth/login', {
			method: 'POST'
		});
		const result = await response.json();
		window.location = result.uri;
	};
</script>

<button on:click={login}>Login</button>
