<script lang="ts">
	import QuickAccessCard from '$lib/components/ui/home/quickAccessCard.svelte';
	import ScheduledScrapers from '$lib/components/ui/home/scheduledScrapers.svelte';
	import AvailableScrapers from '$lib/components/ui/home/availableScrapers.svelte';
</script>

<h1 class="p-8 text-2xl font-bold">Bienvenue Alexandre</h1>

<div class="flex w-full items-start gap-8">
	<QuickAccessCard class="w-1/3" />
	<ScheduledScrapers class="w-1/3" />
	<AvailableScrapers class="w-1/3" />
</div>
