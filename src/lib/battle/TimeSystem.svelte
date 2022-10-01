<script lang="ts">
	import { MAP_CHANGE_TIME_SECONDS } from '$lib/game/constants';
	import { useFrame } from '@threlte/core';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let swapTimer = MAP_CHANGE_TIME_SECONDS;

	let start: number | undefined;
	let previousTimeStamp = 0;

	let paused = false;

	function mapChange() {
		setTimeout(() => {
			dispatch('mapChange');
			paused = false;
		}, 100);
		paused = true;

		swapTimer = MAP_CHANGE_TIME_SECONDS;
	}

	function step(timestamp: number) {
		let delta = (timestamp - previousTimeStamp) * 0.001;
		if (start === undefined) {
			start = timestamp;
		}

		if (!paused) swapTimer -= delta;

		if (swapTimer <= 0) {
			dispatch('endTurn');
			mapChange();
		}

		const elapsed = timestamp - start;

		previousTimeStamp = timestamp * 1;
		window.requestAnimationFrame(step);
	}

	window.requestAnimationFrame(step);
</script>
