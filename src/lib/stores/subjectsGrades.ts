import { writable } from 'svelte/store';
import type { SubjectGrades } from '$models/subjectGrades';

export const subjectsGrades = writable<SubjectGrades[]>([]);

export function setSubjectsGrades(newSubjectsGrades: SubjectGrades[]) {
	subjectsGrades.set(newSubjectsGrades);
}
