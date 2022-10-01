import { xoshiro128ss } from './util';

export const initBattle = (location: string) => {
	const rng = xoshiro128ss(location);
};

interface BattleState {
	startingDifficulty: number;
	currentMap: number;
	timer: number;
	paused: boolean;
	maps: BattleMap[];
	hp: number;
	mp: number;
	score: number;
	cards: {
		hand: Card[];
		discard: Card[];
		draw: Card[];
	};
}

interface BattleMap {
	id: number;
	shields: number;
	grid: Tile[][];
	enemies: Enemy[];
	allies: Ally[];
	objects: [];
}

interface Tile {}

interface Enemy {}
interface Ally {}

interface Card {}

interface Objects {}

interface Command {
	battlemapId: number;
	type: string;
	target: number[][];
}
