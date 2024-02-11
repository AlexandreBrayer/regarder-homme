<script lang="ts">
	interface $$Props {
		name: string;
		date: string;
	}
	let { name, date } = $props() satisfies $$Props;
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex items-center justify-between rounded-xl border p-3">
	<div class="flex flex-col">
		<span class="text-primary">
			{name}
		</span>
		<span class=" text-xs">
			le {date}
		</span>
	</div>
	<Button variant="outline">Infos</Button>
</div>
