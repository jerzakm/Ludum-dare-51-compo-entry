<script lang="ts">
	import { PlaneGeometry, MeshBasicMaterial } from 'three';
	import { AmbientLight, Mesh, PerspectiveCamera, OrbitControls, Group } from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import type { BattleState } from '$lib/game/dataStructure';
	import Ground from './Ground.svelte';
	import Enemy from './Enemy.svelte';
	import { get } from 'svelte/store';
	import DefenseShield from './DefenseShield.svelte';

	export let state: BattleState;

	const MAP_SPREAD = 50;
</script>

<PerspectiveCamera fov={24} position={{ x: MAP_SPREAD * 0 + 7, y: 15, z: 13 }}>
	<OrbitControls
		target={{ x: MAP_SPREAD * 0 + 7, y: 0, z: 0 }}
		maxPolarAngle={DEG2RAD * 90}
		minPolarAngle={DEG2RAD * 30}
		autoRotate={false}
		enableZoom={true}
		enableRotate={true}
		enablePan={true}
	/>
</PerspectiveCamera>

{#each state.maps as map, i}
	<Group
		position={{ x: 200 * (state.currentMap == i ? 0 : 1), z: 0 * i }}
		rotation={{ y: DEG2RAD * 90 }}
	>
		<Ground tiles={map.grid} terrainType={map.type} />
		<DefenseShield position={{ z: -0.75, y: 0.5, x: 2 }} active={i == state.currentMap} />

		<!-- Spawning pads -->
		<Mesh
			geometry={new PlaneGeometry(5, 5)}
			material={new MeshBasicMaterial({ color: 0x005500 })}
			rotation={{ x: DEG2RAD * -90 }}
			position={{ z: -2.5, y: -0.05, x: 2 }}
		/>
		<Mesh
			geometry={new PlaneGeometry(5, 5)}
			material={new MeshBasicMaterial({ color: 0x550000 })}
			rotation={{ x: DEG2RAD * -90 }}
			position={{ z: 15.5, y: -0.05, x: 2 }}
		/>
		{#each map.enemies as enemy}
			<Enemy {enemy} />
		{/each}
	</Group>
{/each}

<AmbientLight intensity={1} />
