<script lang="ts">
	import { Search, PlayCircle, Shell } from 'lucide-svelte';
	import ToggleMode from './toggleMode.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	let logoutForm = $state<HTMLFormElement>();
</script>

<header class="flex items-center justify-between border-b p-2">
	<a href="/" class="flex gap-2"><Shell /> Watchman</a>
	<div class="flex gap-4">
		<a href="/products" class="ml-4 flex items-center gap-1"> <Search /> Explorer </a>
		<a href="/scrapers" class="ml-4 flex items-center gap-1"><PlayCircle /> Scrapers </a>
		<ToggleMode />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				><Avatar.Root>
					<Avatar.Image
						src="https://api.dicebear.com/7.x/lorelei/svg?seed=Alex&backgroundColor=ffffff"
						alt="AB"
					/>
					<Avatar.Fallback>A</Avatar.Fallback>
				</Avatar.Root></DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Mon compte</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Profil</DropdownMenu.Item>
					<form bind:this={logoutForm} action="/logout" method="POST">
						<DropdownMenu.Item on:click={() => {
							logoutForm?.submit();
						}}>
							Déconnexion
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
