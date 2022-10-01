export interface BattleState {
	rng: () => number | undefined;
	startingDifficulty: number;
	currentMap: number;
	xp: number;
	playerLevel: number;
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
	commandLog: any[];
}

export interface BattleMap {
	id: number;
	shieldHp: number;
	shieldDef: number;
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
	enemies?: Enemy[];
}

export interface Enemy {
	name: string;
	currentHp: number;
	maxHp: number;
	shields: number;
	sprite: string;
	size: { width: number; height: number };
	moveSpeed: number;
	type: 'ranged' | 'meele' | 'healer';
	atkValue: number;
	healValue: number;
	range: number;
	alive: boolean;
	spawned: boolean;
	position: Position;
	processTurn: () => BattleState;
}
export interface Ally {}

export interface Card {
	id: string;
	name: string;
	manaCost: string;
	type: 'heal' | 'atk_meele' | 'atk_ranged' | 'point' | 'spawn';
	shape: 'point' | 'wall' | 'line' | 'square';
	atkValue: number;
	healValue: number;
	spellLevel: number;
	repeat?: number;
	burn: boolean;
}

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
