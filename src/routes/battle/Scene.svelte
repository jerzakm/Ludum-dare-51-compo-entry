<script lang="ts">
	import { MeshStandardMaterial, BoxGeometry } from 'three';
	import {
		AmbientLight,
		DirectionalLight,
		InstancedMesh,
		OrthographicCamera,
		useThrelte,
		Mesh,
		PerspectiveCamera,
		OrbitControls
	} from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	const geometry = new BoxGeometry(1, 0.5, 1);
	const material = new MeshStandardMaterial();

	const width = 10;
	const height = 10;

	/* generate fifty iterations, show the last one */
	// for (var i = 49; i >= 0; i--) {
	// 	map.create();
	// }

	const positions: { x: number; z: number; y: number }[] = [];
	for (let x = 0; x < width; x += 1) {
		for (let z = 0; z < height; z += 1) {
			positions.push({
				x,
				y: Math.random() * 0.02,
				z
			});
		}
	}

	let cameraPosition = {
		x: 50,
		y: 50,
		z: 25
	};

	const { size } = useThrelte();
	let zoom = $size.width / 50;
	$: zoom = $size.width / 50;
</script>

<PerspectiveCamera fov={24} position={cameraPosition} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls
		maxPolarAngle={DEG2RAD * 90}
		minPolarAngle={DEG2RAD * 30}
		autoRotate={false}
		enableZoom={true}
		enableRotate={true}
		enablePan={true}
		screenSpacePanning={false}
	/>
</PerspectiveCamera>

{#each positions as position}
	<Mesh {geometry} {material} {position} />
{/each}

<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={0} />
