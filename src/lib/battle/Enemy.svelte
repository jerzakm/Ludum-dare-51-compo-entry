<script lang="ts">
	import type { Enemy } from '$lib/game/dataStructure';
	import { MeshInstance, useFrame, useTexture } from '@threlte/core';
	import { get } from 'svelte/store';
	import {
		DoubleSide,
		Mesh,
		MeshPhongMaterial,
		NearestFilter,
		PlaneGeometry,
		Vector3
	} from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	export let enemy: Enemy;

	const texture = useTexture(`enemies/${enemy.sprite}.png`);
	texture.minFilter = NearestFilter;
	texture.magFilter = NearestFilter;

	const geometry = new PlaneGeometry(enemy.size.width, enemy.size.height);
	const material = new MeshPhongMaterial({ side: DoubleSide, map: texture, transparent: true });
	const mesh = new Mesh(geometry, material);

	let currentPosition = { x: 0, y: 0, z: 0 };

	let worldPos = mesh.getWorldPosition(new Vector3());

	useFrame(({ camera }) => {
		worldPos = mesh.getWorldPosition(new Vector3());
		const cam = get(camera);
		currentPosition = cam.position;
	});
</script>

<MeshInstance
	{mesh}
	position={{ x: enemy.position.x, y: enemy.size.height * 0.5, z: enemy.position.y }}
	rotation={{
		y:
			Math.atan2(currentPosition.x - enemy.position.y, currentPosition.z - enemy.position.x) +
			DEG2RAD * 90
	}}
/>
