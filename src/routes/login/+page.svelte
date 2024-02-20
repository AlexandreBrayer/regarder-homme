<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import LoginFrom from '$lib/components/ui/login/loginFrom.svelte';

	export let data;
	const form = superForm(data.form);
</script>

<LoginFrom superForm={form} class=" m-auto mt-8 w-1/2" />
