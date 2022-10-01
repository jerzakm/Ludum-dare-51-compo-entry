import type { Enemy } from '../dataStructure';

export const makeOrc = (level: number): Enemy => {
	//

	const orc: Enemy = {
		name: 'Orc',
		currentHp: 1,
		maxHp: 1,
		shields: 1,
		sprite: 'orc',
		size: { width: 1, height: 1 },
		moveSpeed: 1,
		atkValue: 1,
		healValue: 0,
		range: 1,
		type: 'meele',
		alive: true,
		position: { x: 2, y: 14 },
		spawned: false,
		processTurn: processOrcTurn
	};

	return orc;
};

function processOrcTurn() {
	console.log('processing orc turn..');
	let k: any;
	return k;
}
