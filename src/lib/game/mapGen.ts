import type { BattleMap, Tile } from './dataStructure';

export const generateMap = (
	rng: () => number,
	width: number,
	height: number,
	type: 'forrest' | 'dungeon' | 'desert' | 'mountains'
) => {
	const tiles: Tile[][] = [];

	for (let x = 0; x < width; x++) {
		tiles.push([]);
		for (let y = 0; y < height; y++) {
			tiles[x][y] = {
				type: 'ground'
			};
		}
	}

	const map: BattleMap = {
		allies: [],
		enemies: [],
		grid: [],
		id: 0,
		objects: [],
		playerLocation: { x: 0, y: 0 },
		shields: 0,
		type: 'desert'
	};

	return map;
};
