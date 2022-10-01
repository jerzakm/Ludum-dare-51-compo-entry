import type { BattleState } from './dataStructure';
import { generateMap } from './mapGen';
import { xoshiro128ss } from './util';

export const initBattle = (location: string) => {
	const rng = xoshiro128ss(location);

	const state: BattleState = {
		hp: 10,
		mp: 0,
		cards: {
			discard: [],
			draw: [],
			hand: []
		},
		currentMap: 0,
		maps: [],
		paused: true,
		score: 0,
		startingDifficulty: 0,
		timer: 0
	};

	state.maps.push(generateMap(rng, 5, 15, 'desert'));
	state.maps.push(generateMap(rng, 5, 15, 'grass'));
	state.maps.push(generateMap(rng, 5, 15, 'dungeon'));

	return state;
};
