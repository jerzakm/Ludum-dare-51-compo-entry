<script lang="ts">
	import { MeshStandardMaterial, SphereGeometry } from 'three';
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

	const geometry = new SphereGeometry(0.5);
	const material = new MeshStandardMaterial();

	const positions: { x: number; z: number }[] = [];
	const rows = 30;
	for (let x = 0; x < rows; x += 1) {
		for (let z = 0; z < rows; z += 1) {
			positions.push({
				x,
				z
			});
		}
	}

	let cameraPosition = {
		x: 10,
		y: 10,
		z: 15
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
