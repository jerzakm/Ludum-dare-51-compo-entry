export interface BattleState {
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

export interface BattleMap {
	id: number;
	shields: number;
	grid: Tile[][];
	enemies: Enemy[];
	allies: Ally[];
	objects: any[];
	mapSize: Position;
	playerLocation: Position;
	type: 'grass' | 'dungeon' | 'desert';
}

export interface Tile {
	type: 'ground' | 'hazard' | 'obstacle' | 'wall';
}

export interface Enemy {}
export interface Ally {}

export interface Card {}

export interface Objects {}

export interface Command {
	battlemapId: number;
	type: string;
	target: number[][];
}

interface Position {
	x: number;
	y: number;
	z?: number;
}
