import { animationQueue } from '../animationQueue';
import { MAP_HEIGHT, MAP_WIDTH } from '../constants';
import type { BattleMap, BattleState, Enemy } from '../dataStructure';
import { calculateTileOccupancy } from '../util';

export const aiMove = (enemy: Enemy, map: BattleMap, state: BattleState) => {
	// only make a step when not end of map
	if (enemy.position.y > 0) {
		for (let step = 0; step < enemy.moveSpeed; step++) {
			const moveGoal = Math.max(0, enemy.position.y - 1);

			animationQueue.push({
				type: 'move',
				data: {
					from: enemy.position.y,
					to: enemy.position.y - 1
				},
				duration: 100,
				state: { ...state }
			});

			enemy.position.y = moveGoal;
		}
		calculateTileOccupancy(map);
	}
};

export const attackShield = (enemy: Enemy, map: BattleMap, state: BattleState) => {
	if (enemy.position.y == 0) {
		map.shieldHp = Math.max(map.shieldHp + map.shieldDef - enemy.atkValue, 0);
	}
};
