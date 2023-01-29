import { writable } from 'svelte/store';
import type { Grade } from '$models/grade';

export const selectedGrade = writable<Grade | null>();

export function setSelectedGrade(grade: Grade) {
	selectedGrade.set(grade);
}

export function resetSelectedGrade() {
	selectedGrade.set(null);
}
