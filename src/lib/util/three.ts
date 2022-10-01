import { Camera, Object3D, Vector3 } from 'three';

export const worldToWindowPosition = (
	object3D: Object3D,
	camera: Camera,
	canvasWidth: number,
	canvasHeight: number,
	positionMod: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
) => {
	let position = new Vector3();
	position = position.setFromMatrixPosition(object3D.matrixWorld);
	position.x += positionMod.x;
	position.y += positionMod.y;
	position.z += positionMod.z;
	position.project(camera);

	const widthHalf = canvasWidth / 2;
	const heightHalf = canvasHeight / 2;

	position.x = position.x * widthHalf + widthHalf;
	position.y = -(position.y * heightHalf) + heightHalf;
	position.z = 0;

	return { x: position.x, y: position.y };
};
