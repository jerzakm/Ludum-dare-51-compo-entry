import type { BattleMap, BattleState, Enemy } from '../dataStructure';
import { aiMove, attackShield } from './commonMoves';

export const makeOrc = (level: number): Enemy => {
	//

	const orc: Enemy = {
		name: 'Orc',
		currentHp: 1,
		maxHp: 1,
		shields: 1,
		sprite: 'orc',
		size: { width: 1, height: 1 },
		moveSpeed: 2,
		atkValue: 2,
		healValue: 0,
		range: 1,
		type: 'meele',
		alive: true,
		position: { x: 2, y: 14 },
		spawned: false,
		processTurn: processOrcTurn,
		ai: ['move', 'attack']
	};

	return orc;
};

function processOrcTurn(enemy: Enemy, map: BattleMap, state: BattleState) {
	for (const action of enemy.ai) {
		if (action == 'move') {
			aiMove(enemy, map);
		}
		if (action == 'attack') {
			attackShield(enemy, map, state);
		}
	}

	return state;
}
