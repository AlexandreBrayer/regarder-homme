<script lang="ts">
	interface $$Props {
		name: string;
		productCount: number;
		isFirst: boolean;
	}
	let { name, productCount, isFirst } = $props() satisfies $$Props;
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex items-center justify-between rounded-xl border p-3" class:border-primary={isFirst}>
	<div class="flex flex-col">
		<span class="text-primary">
			{name}
		</span>
		<span class=" text-xs">
			{productCount} produits scrapés
		</span>
	</div>
	<Button variant="outline">Voir tout</Button>
</div>
