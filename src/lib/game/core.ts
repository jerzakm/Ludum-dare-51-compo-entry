import { BASE_MANA_REGEN, BASE_MAX_MANA } from './constants';
import type { BattleState } from './dataStructure';
import { spawnEnemy } from './enemies/enemySpawner';
import { generateMap } from './mapGen';
import { xoshiro128ss } from './util';

export const initBattle = (location: string) => {
	const rng = xoshiro128ss(location);
	let state: BattleState = {
		rng,
		hp: 5,
		mp: 5,
		xp: 0,
		playerLevel: 1,
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

	state = spawnEnemies(state);

	return state;
};

export const issueCommand = (state: BattleState, type: Command, data: any) => {
	if (type == 'MAP_CHANGE') {
		state = mapChange(state);
		state = spawnEnemies(state);
	}
	state.commandLog.push({ type, data });

	return state;
};

function mapChange(state: BattleState) {
	const nextMap = state.currentMap + 1 > state.maps.length - 1 ? 0 : state.currentMap + 1;
	state.currentMap = nextMap;

	// MANA REGEN ON MAP CHANGE
	state.mp = Math.min(state.mp + BASE_MANA_REGEN, BASE_MAX_MANA);
	return state;
}

function spawnEnemies(state: BattleState) {
	const aliveEnemies = state.maps[state.currentMap].enemies.filter((e) => {
		return e.alive != true;
	}).length;

	if (aliveEnemies < 1 + state.playerLevel) {
		console.log('spawning enemy');
		//spawn enemy
		const newEnemy = spawnEnemy(state.playerLevel);
		state.maps[state.currentMap].enemies.push(newEnemy);
	}

	return state;
}

type Command = 'MAP_CHANGE';
