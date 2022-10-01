<script lang="ts">
	import { MeshStandardMaterial, BoxGeometry, PlaneGeometry, MeshBasicMaterial } from 'three';
	import {
		AmbientLight,
		DirectionalLight,
		InstancedMesh,
		OrthographicCamera,
		useThrelte,
		Mesh,
		PerspectiveCamera,
		OrbitControls,
		useFrame,
		Group
	} from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import type { BattleState } from '$lib/game/dataStructure';
	import Ground from './Ground.svelte';
	import { get } from 'svelte/store';

	export let state: BattleState;

	/* generate fifty iterations, show the last one */
	// for (var i = 49; i >= 0; i--) {
	// 	map.create();
	// }

	$: currentMap = state;

	const MAP_SPREAD = 50;

	let lastSwap = 0;
	useFrame((threlte) => {
		const cam = get(threlte.camera);
		const time = threlte.clock.elapsedTime;

		if (time - lastSwap >= 1) {
			lastSwap = time;
			const nextMap = state.currentMap + 1 > state.maps.length - 1 ? 0 : state.currentMap + 1;
			state.currentMap = nextMap;
			state = state;
		}
	});
</script>

<PerspectiveCamera fov={24} position={{ x: MAP_SPREAD * state.currentMap + 5, y: 10, z: 20 }}>
	<OrbitControls
		target={{ x: MAP_SPREAD * state.currentMap + 5, y: 0, z: 0 }}
		maxPolarAngle={DEG2RAD * 90}
		minPolarAngle={DEG2RAD * 30}
		autoRotate={false}
		enableZoom={true}
		enableRotate={true}
		enablePan={true}
	/>
</PerspectiveCamera>

{#each state.maps as map, i}
	<Group position={{ x: MAP_SPREAD * i, z: 0 * i }} rotation={{ y: DEG2RAD * 90 }}>
		<Mesh
			geometry={new PlaneGeometry(5, 5)}
			material={new MeshBasicMaterial({ color: 0x050000 })}
			rotation={{ x: DEG2RAD * -90 }}
			position={{ z: -2.5, y: 0, x: 2 }}
		/>
		<Ground tiles={map.grid} terrainType={map.type} />
	</Group>
{/each}

<AmbientLight intensity={1} />
