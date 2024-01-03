<script>
	import { onMount } from 'svelte';
	import { getAuthClient } from '$lib/auth';

	onMount(async () => {
		const client = await getAuthClient();
		const result = await client.handleRedirectCallback();
		const redirectPath = result.appState;

		if (redirectPath) {
			window.history.replaceState(null, null, redirectPath);
			window.location.reload();
		}
	});
</script>

<h1>Redirecting...please wait</h1>
