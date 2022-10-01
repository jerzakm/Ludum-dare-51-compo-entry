<script lang="ts">
	import { Canvas, useFrame } from '@threlte/core';
	import Scene from '$lib/battle/Scene.svelte';
	import TimeSystem from '$lib/battle/TimeSystem.svelte';
	import { onMount } from 'svelte';
	import { initBattle, issueCommand } from '$lib/game/core';

	import { page } from '$app/stores';

	let towerId = $page.url.searchParams.get('tower');

	if (!towerId) {
		towerId = 'atlantis';
	}

	let state = initBattle(towerId);
	$: console.log(state);
</script>

<div>
	<Canvas frameloop={'always'}>
		<TimeSystem
			on:mapChange={() => {
				state = issueCommand(state, 'MAP_CHANGE', {});
			}}
		/>
		<Scene {state} />
	</Canvas>
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
