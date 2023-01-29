import { writable } from 'svelte/store';

export const gradeTypes = writable<string[]>([]);

export function setGradeTypes(newGradeTypes: string[]) {
	gradeTypes.set(newGradeTypes);
}
