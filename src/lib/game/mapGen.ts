import type { BattleMap, Tile } from './dataStructure';

export const generateMap = (
	rng: () => number,
	width: number,
	height: number,
	type: 'grass' | 'dungeon' | 'desert'
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
		grid: tiles,
		id: 0,
		objects: [],
		playerLocation: { x: Math.floor(width / 2), y: Math.floor(height / 2) },
		shields: 0,
		type: type,
		mapSize: { x: width, y: height }
	};

	return map;
};
