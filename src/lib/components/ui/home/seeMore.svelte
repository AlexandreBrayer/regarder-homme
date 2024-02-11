<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	interface $$Props {
		location: string;
	}
	let { location } = $props() satisfies $$Props;
</script>

<a class="m-auto" href={location}>
	<Button>Voir plus</Button>
</a>
