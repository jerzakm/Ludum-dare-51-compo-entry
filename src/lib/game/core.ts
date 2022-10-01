import { BASE_MANA_REGEN, BASE_MAX_MANA, MAP_HEIGHT, MAP_WIDTH } from './constants';
import type { BattleState } from './dataStructure';
import { spawnEnemy } from './enemies/enemySpawner';
import { generateMap } from './mapGen';
import { calculateTileOccupancy, xoshiro128ss } from './util';

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

	state.maps.push(generateMap(rng, MAP_HEIGHT, MAP_WIDTH, 'desert'));
	state.maps.push(generateMap(rng, 5, 15, 'grass'));
	state.maps.push(generateMap(rng, 5, 15, 'dungeon'));

	state = spawnEnemies(state);

	return state;
};

export const issueCommand = (state: BattleState, type: Command, data: any) => {
	if (type == 'MAP_CHANGE') {
		state = mapChange(state);
		state = spawnEnemies(state);
		state = processEnemyActions(state);
	}
	state.commandLog.push({ type, data });

	return state;
};

function mapChange(state: BattleState) {
	calculateTileOccupancy(state.maps[state.currentMap]);
	const nextMap = state.currentMap + 1 > state.maps.length - 1 ? 0 : state.currentMap + 1;
	state.currentMap = nextMap;

	// MANA REGEN ON MAP CHANGE
	state.mp = Math.min(state.mp + BASE_MANA_REGEN, BASE_MAX_MANA);
	return state;
}

function spawnEnemies(state: BattleState) {
	for (let y = 0; y < MAP_HEIGHT; y++) {
		const lastTile = state.maps[state.currentMap].grid[y][MAP_WIDTH - 1];

		// CHECK FOR FREE SPACE
		if (lastTile.enemies.length == 0) {
			const aliveEnemies = state.maps[state.currentMap].enemies.filter((e) => {
				return e.alive == true;
			}).length;

			// ADJUST DIFFICULTY / SPAWN RATE HERE
			if (aliveEnemies < 3) {
				const newEnemy = spawnEnemy(state.playerLevel);
				newEnemy.position.x = y;
				newEnemy.position.y = MAP_WIDTH - 1;
				state.maps[state.currentMap].enemies.push(newEnemy);
			}
		}
	}

	return state;
}

function processEnemyActions(state: BattleState) {
	const currentMap = state.maps[state.currentMap];

	for (let i = 0; i < state.maps[state.currentMap].enemies.length; i++) {
		const enemy = state.maps[state.currentMap].enemies[i];
		enemy.processTurn(enemy, currentMap, state);
	}
	return state;
}

type Command = 'MAP_CHANGE';
