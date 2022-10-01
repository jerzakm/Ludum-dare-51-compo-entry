<script lang="ts">
	import type { Enemy } from '$lib/game/dataStructure';
	import { MeshInstance, useFrame, useTexture } from '@threlte/core';
	import { DoubleSide, Mesh, MeshPhongMaterial, NearestFilter, PlaneGeometry } from 'three';

	export let enemy: Enemy;

	console.log(enemy);

	const texture = useTexture(`enemies/${enemy.sprite}.png`);
	texture.minFilter = NearestFilter;
	texture.magFilter = NearestFilter;

	const geometry = new PlaneGeometry(enemy.size.width, enemy.size.height);
	const material = new MeshPhongMaterial({ side: DoubleSide, map: texture, transparent: true });
	const mesh = new Mesh(geometry, material);

	useFrame(({ camera }) => {
		// const cam = get(camera);
		// if (active) {
		// 	const shieldPosition = worldToWindowPosition(
		// 		mesh,
		// 		cam,
		// 		window.innerWidth,
		// 		window.innerHeight,
		// 		{ x: 0.2, y: 0, z: 2 }
		// 	);
		// 	defenseShieldPosition.set(shieldPosition);
		// }
	});
</script>

<MeshInstance
	{mesh}
	position={{ x: enemy.position.x, y: enemy.size.height * 0.5, z: enemy.position.y }}
/>
