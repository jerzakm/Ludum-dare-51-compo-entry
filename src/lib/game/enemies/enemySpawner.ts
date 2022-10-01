import { makeOrc } from './orc';

export const spawnEnemy = (level = 1) => {
	return makeOrc(level);
};
