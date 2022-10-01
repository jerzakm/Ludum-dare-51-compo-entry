<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import * as mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';

	let mapEl: HTMLElement;

	export let map: mapboxgl.Map;

	const config = {
		lat: 37,
		lng: -3,
		zoom: 4,
		fillOpacity: 0.6,
		colorScale: ['#ffffcc', '#78c679', '#006837'],
		h3Scale: 2
	};

	onMount(() => {
		const accessToken =
			'pk.eyJ1IjoiamVyemFrbSIsImEiOiJjangxaHF4MGcwN3ZqNGJubzl2Zzdva3N5In0.DRchXs3ESLUuoH9Kh_N-ow';
		const newmap = new mapboxgl.Map({
			accessToken,
			container: mapEl,
			style: 'mapbox://styles/jerzakm/cl3njkens000614s1xutw0naf',
			center: [config.lng, config.lat],
			zoom: config.zoom
			// projection: {
			// 	name: 'globe'
			// }
		});
		map = newmap;
	});
</script>

<div bind:this={mapEl} id="map" />

<style>
	#map {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.marker {
		background-image: url('gui/map_dungeon.png');
		background-size: cover;
		width: 96px;
		height: 96px;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
