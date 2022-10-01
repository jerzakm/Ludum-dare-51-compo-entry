<script lang="ts">
	import TowerMarker from '$lib/map/TowerMarker.svelte';
	import Map from '$lib/map/Map.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let map: mapboxgl.Map;

	let towers: any[] = [];
	$: console.log(map);
	$: console.log(towers);

	onMount(async () => {
		const towerData = await supabase.from('dungeons').select(`*`);
		if (towerData) {
			towers = [...towerData.body];
		}
	});
</script>

<Map bind:map />
{#if map}
	{#each towers as dungeon, i}
		<TowerMarker {map} {dungeon} on:click={() => console.log(dungeon)} />
	{/each}
{/if}
