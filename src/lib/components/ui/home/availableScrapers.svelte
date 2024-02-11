<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Card from '$lib/components/ui/card';
	import SeeMore from './seeMore.svelte';
	import AvailableScraperItem from './availableScraperItem.svelte';
	import { faker } from '@faker-js/faker';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Scrapers disponibles</Card.Title>
		<Card.Description>Liste des derniers scrapers lancés</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		{#each Array.from(Array(5).keys()) as _, index (index)}
			<AvailableScraperItem
				name={faker.company.buzzNoun()}
				productCount={faker.number.int({ min: 1000, max: 5000 })}
				isFirst={index === 0}
			/>
		{/each}
	</Card.Content>
	<Card.Footer>
		<SeeMore location="/scrapers" />
	</Card.Footer>
</Card.Root>
