<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Card from '$lib/components/ui/card';
	import { Search, PlayCircle, Trello } from 'lucide-svelte';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Accès rapide</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<a class="flex gap-2" href="/products"><Search class="text-primary" /> Explorer</a>
		<a class="flex gap-2" href="/scrapers"><PlayCircle class="text-primary" /> Scrapers</a>
		<a class="flex gap-2" href="https://trello.com/b/zr9aCde6/watchman">
			<Trello class="text-primary" />
			Trello
		</a>
	</Card.Content>
</Card.Root>
