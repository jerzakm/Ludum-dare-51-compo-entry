<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onDestroy, onMount } from 'svelte';

	export let map: mapboxgl.Map;
	export let dungeon: {
		id: string;
		name: string;
		img: string;
		description: string;
		lngLat: mapboxgl.LngLatLike;
	};

	console.log(dungeon);

	let marker: mapboxgl.Marker;
	let markerEl: HTMLElement;

	onMount(() => {
		marker = new mapboxgl.Marker(markerEl).setLngLat(dungeon.lngLat).addTo(map);
	});
	onDestroy(() => {
		// marker.remove();
	});
</script>

<div bind:this={markerEl} class="marker cursor-pointer " on:click>
	<div class="flex flex-col items-center marker-content">
		<img src="gui/map_dungeon.png" class="w-24 h-24 marker-img" />
		<span class="text-lg   dungeon-name">{dungeon.name}</span>
	</div>
</div>

<style>
	.marker {
		font-family: 'Billy';
	}

	.dungeon-name {
		color: rgb(255, 230, 0);
	}

	.marker-img {
		animation: pulse 2s infinite;
		box-shadow: 0 0 0 0px rgb(255, 255, 255);
		border-radius: 50%;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.9);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
		}
		100% {
			transform: scale(0.9);
			box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
		}
	}

	@keyframes example {
		0% {
			background-color: red;
		}
		25% {
			background-color: yellow;
		}
		50% {
			background-color: blue;
		}
		100% {
			background-color: green;
			transform: scale(2);
		}
	}
</style>
