<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/ui/header/header.svelte';
</script>

<Header />

<div class="m-auto max-w-7xl">
	<slot />
</div>
