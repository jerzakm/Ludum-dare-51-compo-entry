<script lang="ts">
	import { MAP_CHANGE_TIME_SECONDS } from '$lib/game/constants';
	import { useFrame } from '@threlte/core';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let lastSwap = 0;

	export let swapTimer = 10;
	useFrame((threlte) => {
		const time = threlte.clock.elapsedTime;

		swapTimer = lastSwap - time;

		if (time - lastSwap >= MAP_CHANGE_TIME_SECONDS) {
			lastSwap = time;
			dispatch('mapChange');
		}
	});
</script>
