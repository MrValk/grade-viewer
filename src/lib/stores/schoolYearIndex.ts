import { writable } from 'svelte/store';

export const schoolYearIndex = writable<number>(0);

export function setSchoolYearIndex(newSchoolYearIndex: number) {
	schoolYearIndex.set(newSchoolYearIndex);
}
