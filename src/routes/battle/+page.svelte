<script lang="ts">
	import { Canvas, useFrame } from '@threlte/core';
	import Scene from '$lib/battle/Scene.svelte';
	import TimeSystem from '$lib/battle/TimeSystem.svelte';
	import { onMount } from 'svelte';
	import { initBattle, issueCommand } from '$lib/game/core';

	import { page } from '$app/stores';
	import GuiLayout from '$lib/gui/GUILayout.svelte';

	let towerId = $page.url.searchParams.get('tower') || 'atlantis';

	let swapTimer = 10;

	$: console.log(swapTimer);

	let state = initBattle(towerId);
	$: console.log(state);
</script>

<div>
	<GuiLayout {swapTimer} name={towerId} {state} />
	<Canvas frameloop={'always'}>
		<TimeSystem
			bind:swapTimer
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
