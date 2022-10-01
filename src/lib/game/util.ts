import { MAP_HEIGHT, MAP_WIDTH } from './constants';
import type { BattleMap, Enemy, Tile } from './dataStructure';

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const cyrb128 = (str: string) => {
	let h1 = 1779033703,
		h2 = 3144134277,
		h3 = 1013904242,
		h4 = 2773480762;
	for (let i = 0, k; i < str.length; i++) {
		k = str.charCodeAt(i);
		h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
		h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
		h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
		h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	}
	h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	return {
		a: (h1 ^ h2 ^ h3 ^ h4) >>> 0,
		b: (h2 ^ h1) >>> 0,
		c: (h3 ^ h1) >>> 0,
		d: (h4 ^ h1) >>> 0
	};
};

export const xoshiro128ss = (seed: string) => {
	let { a, b, c, d } = cyrb128(seed);
	return function () {
		var t = b << 9,
			r = a * 5;
		r = ((r << 7) | (r >>> 25)) * 9;
		c ^= a;
		d ^= b;
		b ^= c;
		a ^= d;
		c ^= t;
		d = (d << 11) | (d >>> 21);
		return (r >>> 0) / 4294967296;
	};
};

export const calculateTileOccupancy = (map: BattleMap) => {
	for (let x = 0; x < MAP_HEIGHT; x++) {
		for (let y = 0; y < MAP_WIDTH; y++) {
			map.grid[x][y].enemies = [];
		}
	}
	for (const enemy of map.enemies) {
		if (enemy.alive) {
			map.grid[enemy.position.x][enemy.position.y].enemies.push(enemy);
		}
	}
};
