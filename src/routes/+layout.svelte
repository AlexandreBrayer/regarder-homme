<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/ui/header/header.svelte';
	import { setContext } from 'svelte';
	import { userSession } from '$lib/stores/session';

	let { data } = $props();

	$effect(() => {
		userSession.set(data.user);
	});
	setContext('user', userSession);
</script>

<Header />

<div class="m-auto max-w-7xl">
	<slot />
</div>
