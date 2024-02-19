<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import LoginFrom from '$lib/components/ui/login/loginFrom.svelte';
</script>

<form>
	<LoginFrom class=" m-auto mt-8 w-1/2" />
</form>
