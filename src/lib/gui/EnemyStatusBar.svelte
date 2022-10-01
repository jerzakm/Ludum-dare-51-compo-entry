<script lang="ts">
	export let currentHp: number;
	export let maxHp: number;
	export let position = {
		x: 0,
		y: 0
	};
	let width = 150 + maxHp * 3;

	export let shields = 0;
	export let name = 'Test';

	$: hpCellSize = Math.floor(width / Math.min(HP_PER_ROW, maxHp + 1));

	const HP_PER_ROW = 100;
	const HP_BAR_HEIGHT = 8;
</script>

<bar class="fixed flex flex-col items-start" style={`left: ${position.x}px; top: ${position.y}px;`}>
	<div class="enemy-name text-sm">{name}</div>
	<div class="flex gap-1 items-start">
		<hp
			class="grid"
			style={`grid-template-columns: repeat(${Math.min(
				HP_PER_ROW,
				maxHp
			)}, 1fr); background-color: rgba(180,180,180, 0.5);`}
		>
			<img
				src="gui/hp_verbar.png"
				class="absolute"
				style={`z-index: 0; width:${hpCellSize * currentHp}px; height: ${HP_BAR_HEIGHT}px;`}
				alt={`Healthbar`}
			/>
			{#each { length: maxHp } as i, h}
				<!-- <cell
					style={`height: 16px; width: ${hpCellSize}px; background-color:${
						h < currentHp ? 'var(--gui-hp-color)' : 'grey'
					}`}
				/> -->
				<cell style={`height: ${HP_BAR_HEIGHT}px; width: ${hpCellSize}px; `} class="z-10" />
			{/each}
		</hp>
		<shields class="flex items-start">
			{#each { length: shields } as i, h}
				<img src="gui/EnemyBar_Shield.png" alt="Creature's shields" />
			{/each}
		</shields>
	</div>

	<div class="text-xs -mt-3">
		HP {currentHp} / {maxHp}
	</div>
</bar>

<style>
	bar {
		z-index: 100;
		user-select: none;
		pointer-events: none;
		transform: translateX(-50%);
	}

	cell {
		border: solid 1px black;
	}
</style>
