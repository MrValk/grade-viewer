import { writable } from 'svelte/store';
import type { SubjectGrades } from '../models/subjectGrades';

export const subjectGrades = writable<SubjectGrades[]>([]);
export const mostGrades = writable<number>(0);

export function setSubjectGrades(newSubjectGrades: SubjectGrades[]) {
	subjectGrades.set(newSubjectGrades);
}

export function setMostGrades(newMostGrades: number) {
	mostGrades.set(newMostGrades);
}
