<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import { initBattle } from '$lib/game/core';

	import { page } from '$app/stores';

	let towerId = $page.url.searchParams.get('tower');

	if (!towerId) {
		towerId = 'atlantis';
	}

	initBattle(towerId);
	console.log(towerId);

	onMount(() => {});
</script>

<div>
	<Canvas frameloop={'always'}>
		<Scene />
	</Canvas>
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
