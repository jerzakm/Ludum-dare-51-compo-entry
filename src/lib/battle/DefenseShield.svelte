<script>
	import { defenseShieldPosition } from '$lib/gui/guiStores';
	import { worldToWindowPosition } from '$lib/util/three';
	import { MeshInstance, useFrame } from '@threlte/core';
	import { get } from 'svelte/store';
	import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

	export let active = false;
	const geometry = new BoxGeometry(5, 1, 0.5);
	const material = new MeshPhongMaterial({ color: 0x0000ff, opacity: 0.5 });

	export let position = { x: 0, y: 0, z: 0 };

	const mesh = new Mesh(geometry, material);

	useFrame(({ camera }) => {
		const cam = get(camera);
		if (active) {
			const shieldPosition = worldToWindowPosition(
				mesh,
				cam,
				window.innerWidth,
				window.innerHeight,
				{ x: 0.2, y: 0, z: 2 }
			);
			defenseShieldPosition.set(shieldPosition);
		}
	});
</script>

<MeshInstance {mesh} {position} />
