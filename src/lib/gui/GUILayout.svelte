<script lang="ts">
	import { ARCANE_SHIELD_DEF_MAX_HP } from '$lib/game/constants';
	import type { BattleState } from '$lib/game/dataStructure';
	import { defenseShieldPosition } from './guiStores';
	import StatusBar from './StatusBar.svelte';

	export let swapTimer: number;
	export let name: string;
	export let state: BattleState;

	let shieldLoc = $defenseShieldPosition;

	defenseShieldPosition.subscribe((v) => {
		shieldLoc = v;
	});
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

	<!-- Arcane Defense HP Bar -->
	<StatusBar
		currentHp={state.maps[state.currentMap].shieldHp}
		maxHp={ARCANE_SHIELD_DEF_MAX_HP}
		color={'blue'}
		name={'Arcane defense shield'}
		shields={state.maps[state.currentMap].shieldDef}
		position={{ x: shieldLoc.x + 40, y: shieldLoc.y + 0 }}
	/>
</gui>
