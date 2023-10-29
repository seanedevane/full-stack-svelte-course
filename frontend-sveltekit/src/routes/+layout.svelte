<script>
	import Nav from '$lib/Nav.svelte';
</script>

<main>
	<section class="section">
		<Nav />
		<div class="container">
			<slot />
		</div>
	</section>
</main>
