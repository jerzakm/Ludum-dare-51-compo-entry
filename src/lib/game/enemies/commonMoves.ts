import { MAP_HEIGHT, MAP_WIDTH } from '../constants';
import type { BattleMap, BattleState, Enemy } from '../dataStructure';
import { calculateTileOccupancy } from '../util';

export const aiMove = (enemy: Enemy, map: BattleMap) => {
	for (let step = 0; step < enemy.moveSpeed; step++) {
		enemy.position.y = Math.max(0, enemy.position.y - 1);
	}
	calculateTileOccupancy(map);
};

export const attackShield = (enemy: Enemy, map: BattleMap, state: BattleState) => {
	if (enemy.position.y == 0) {
		map.shieldHp = Math.max(map.shieldHp + map.shieldDef - enemy.atkValue, 0);
	}
};
