<script lang="ts">
	import TowerMarker from '$lib/map/TowerMarker.svelte';
	import TowerPreview from '$lib/map/TowerPreview.svelte';
	import Map from '$lib/map/Map.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let map: mapboxgl.Map;

	let towers: any[] = [];

	onMount(async () => {
		const towerData = await supabase.from('dungeons').select(`*`);
		if (towerData) {
			towers = [...towerData.body];
		}
	});

	let towerPreview: any | undefined;
</script>

<h1 class="text-5xl">Pick a place to defend yourself</h1>
<container class="flex flex-col items-center content-center overflow-hidden">
	<Map bind:map />
	<div class="pointer-events-none" />
	{#if towerPreview}
		<TowerPreview selectedTower={towerPreview} on:closePreview={() => (towerPreview = undefined)} />
	{/if}
</container>

{#if map}
	{#each towers as tower, i}
		<TowerMarker
			{map}
			{tower}
			on:click={() => (towerPreview = tower)}
			on:click={() => {
				console.log(tower);
			}}
		/>
	{/each}
{/if}

<style>
	.leaderboard {
		width: calc(5rem + 25vmax);
		height: 100vh;
		background-color: var(--color-background);
	}
</style>
