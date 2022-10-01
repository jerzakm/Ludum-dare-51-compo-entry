<script>
	import { Mesh } from '@threlte/core';
	import { BoxGeometry, MeshPhongMaterial } from 'three';

	const geometry = new BoxGeometry(5, 1, 0.5);
	const material = new MeshPhongMaterial({ color: 0x0000ff, opacity: 0.5 });

	export let position = { x: 0, y: 0, z: 0 };
</script>

<Mesh {geometry} {material} {position} />
