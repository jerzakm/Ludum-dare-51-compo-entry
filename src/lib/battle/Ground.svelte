<script lang="ts">
	import type { Tile } from '$lib/game/dataStructure';
	import { Instance, InstancedMesh, useTexture } from '@threlte/core';
	import { BoxGeometry, MeshLambertMaterial, NearestFilter } from 'three';

	export let tiles: Tile[][];
	export let terrainType: string;

	const geometry = new BoxGeometry(1, 0.05, 1);

	const tex = useTexture(`tiles/${terrainType}_base.png`);
	tex.minFilter = NearestFilter;
	tex.magFilter = NearestFilter;
	const material = new MeshLambertMaterial({ map: tex });
</script>

<InstancedMesh {geometry} {material}>
	{#each tiles as row, x}
		{#each row as col, y}
			<Instance position={{ x, z: y }} />
		{/each}
	{/each}
</InstancedMesh>
