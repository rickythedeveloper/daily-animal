export function getRandomInt(max: number) {
	return Math.floor(Math.random() * (max + 1));
}

export function getRandomElement<T>(array: Array<T>): T {
	return array[getRandomInt(array.length - 1)];
}

function randomiseNumber(min: number, max: number): number[] {
	return [];
}
