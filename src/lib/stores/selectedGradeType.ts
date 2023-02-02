import { writable } from 'svelte/store';

export const selectedGradeType = writable<string | null>();

export function setSelectedGradeType(type: string) {
	selectedGradeType.set(type);
}

export function resetSelectedGradeType() {
	selectedGradeType.set(null);
}
