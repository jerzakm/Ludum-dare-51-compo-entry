import type { BattleState } from './dataStructure';
import { generateMap } from './mapGen';
import { xoshiro128ss } from './util';

export const initBattle = (location: string) => {
	const rng = xoshiro128ss(location);
	const state: BattleState = {
		rng,
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
		timer: 0,
		commandLog: []
	};

	state.maps.push(generateMap(rng, 5, 15, 'desert'));
	state.maps.push(generateMap(rng, 5, 15, 'grass'));
	state.maps.push(generateMap(rng, 5, 15, 'dungeon'));

	return state;
};

export const issueCommand = (state: BattleState, type: Command, data: any) => {
	if (type == 'MAP_CHANGE') {
		const nextMap = state.currentMap + 1 > state.maps.length - 1 ? 0 : state.currentMap + 1;
		state.currentMap = nextMap;
	}

	state.commandLog.push({ type, data });

	return state;
};

type Command = 'MAP_CHANGE';
