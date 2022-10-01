<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/battle/Scene.svelte';
	import { onMount } from 'svelte';
	import { initBattle } from '$lib/game/core';

	import { page } from '$app/stores';

	let towerId = $page.url.searchParams.get('tower');

	if (!towerId) {
		towerId = 'atlantis';
	}

	const state = initBattle(towerId);

	onMount(() => {});
</script>

<div>
	<Canvas frameloop={'always'}>
		<Scene {state} />
	</Canvas>
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
