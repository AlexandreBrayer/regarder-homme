<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import SeeMore from './seeMore.svelte';
	import ScheduledScraperItem from './scheduledScraperItem.svelte';
	import * as Card from '$lib/components/ui/card';
	import { faker } from '@faker-js/faker';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Scrapers programés</Card.Title>
		<Card.Description>Liste des prochains scraps</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		{#each Array.from(Array(5).keys()) as _, index (index)}
			<ScheduledScraperItem
				name={faker.company.buzzNoun()}
				date={faker.date.soon().toLocaleDateString('fr-FR')}
			/>
		{/each}
	</Card.Content>
	<Card.Footer>
		<SeeMore location="/scrapers" />
	</Card.Footer>
</Card.Root>
