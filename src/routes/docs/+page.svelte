<script lang="ts">
	import { onMount } from 'svelte';
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';

	onMount(async () => {
		SwaggerUI({
			spec: await fetch('/def').then((res) => res.json()),
			dom_id: '#swagger-ui-container'
		});
	});
</script>

<svelte:head>
	<title>SwaggerUI</title>
</svelte:head>

<div id="swagger-ui-container" />
