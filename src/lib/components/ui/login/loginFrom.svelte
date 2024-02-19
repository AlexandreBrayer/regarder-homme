<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title class="mx-auto">Se connecter</Card.Title>
		<Card.Description></Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-8">
		<Input type="text" placeholder="Nom d'utilisateur" />
		<Input type="password" placeholder="Mot de passe" />
	</Card.Content>
	<Card.Footer>
		<Button type="submit" class="mt-4 w-full">Se connecter</Button>
	</Card.Footer>
</Card.Root>
