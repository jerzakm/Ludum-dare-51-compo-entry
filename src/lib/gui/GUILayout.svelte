<script lang="ts">
	import type { BattleState } from '$lib/game/dataStructure';

	export let swapTimer: number;
	export let name: string;
	export let state: BattleState;
</script>

<gui class="absolute w-full h-full pointer-events-none">
	<div class="flex justify-between px-10">
		<div class="flex flex-col items-center">
			<span>Next temporal shift in:</span>
			<span class="text-2xl font-bold">{swapTimer.toFixed(1)}</span>
		</div>
		<div class="flex flex-col items-center">
			<h1>Defend {name}</h1>
			<span class="text-sm"
				>Kill or delay your enemies to allow scholars to save precious arcane knowledge.</span
			>
		</div>
		<h1>Battle {state.currentMap + 1}/{state.maps.length}</h1>
	</div>
</gui>
