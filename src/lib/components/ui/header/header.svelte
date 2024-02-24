<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { Search, PlayCircle, Shell } from 'lucide-svelte';
	import ToggleMode from './toggleMode.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { getContext } from 'svelte';
	import type { UserContext } from '$lib/stores/session';

	let logoutForm = $state<HTMLFormElement>();
	const user = getContext<Writable<UserContext>>('user');
</script>

<header class="flex items-center justify-between border-b p-2">
	<a href="/" class="flex gap-2"><Shell /> Watchman</a>

	<div class="flex gap-4">
		<a href="/products" class="ml-4 flex items-center gap-1"><Search /> Explorer</a>
		<a href="/scrapers" class="ml-4 flex items-center gap-1"><PlayCircle /> Scrapers</a>
		<ToggleMode />
		{#if $user}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image
							src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${$user._id}&backgroundColor=ffffff`}
							alt="AB"
						/>
						<Avatar.Fallback>{$user.username[0]}</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Mon compte</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<a href="/profile">
							<DropdownMenu.Item>Profil</DropdownMenu.Item>
						</a>
						<form bind:this={logoutForm} action="/logout" method="POST">
							<DropdownMenu.Item
								on:click={() => {
									logoutForm?.submit();
								}}
							>
								Déconnexion
							</DropdownMenu.Item>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Avatar.Root>
				<Avatar.Fallback>?</Avatar.Fallback>
			</Avatar.Root>
		{/if}
	</div>
</header>
