import type { BattleState } from './dataStructure';

export const animationQueue: Animation[] = [];

interface Animation {
	type: 'move';
	duration: number;
	data: any;
	state: BattleState;
}
