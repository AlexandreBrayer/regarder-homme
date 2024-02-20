<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SuperForm } from 'sveltekit-superforms';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	type $$Props = HTMLAttributes<HTMLDivElement> & {
		superForm: SuperForm<{
			username: string;
			password: string;
		}>;
	};

	export let superForm: $$Props['superForm'];

	let { form, errors, constraints, enhance } = superForm;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<form method="POST" class={className} use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title class="mx-auto">Se connecter</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-8">
			<Input
				bind:value={$form.username}
				aria-invalid={$errors.username ? 'true' : undefined}
				name="username"
				type="text"
				placeholder="Nom d'utilisateur"
				{...$constraints.username}
			/>
			{#if $errors.username}<span class="text-sm">{$errors.username}</span>{/if}
			<Input
				bind:value={$form.password}
				aria-invalid={$errors.password ? 'true' : undefined}
				name="password"
				type="password"
				placeholder="Mot de passe"
				{...$constraints.password}
			/>
			{#if $errors.password}<span class="text-sm">{$errors.password}</span>{/if}
		</Card.Content>
		<Card.Footer>
			<Button type="submit" class="mt-4 w-full">Se connecter</Button>
		</Card.Footer>
	</Card.Root>
</form>
