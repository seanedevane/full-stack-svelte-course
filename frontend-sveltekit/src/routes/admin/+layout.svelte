<script>
	import { onMount } from 'svelte';
	import { user } from '../../stores';

	onMount(() => {
		user.set({
			name: 'Test user',
			schoolName: 'Test school'
		});
	});
</script>

<div>Base Admin Layout</div>
<slot />
