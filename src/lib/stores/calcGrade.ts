import { writable } from 'svelte/store';

export const calcGrade = writable<boolean>(false);

export function setCalcGrade(value: boolean) {
	calcGrade.set(value);
}
