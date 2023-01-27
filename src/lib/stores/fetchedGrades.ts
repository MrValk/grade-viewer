import { writable, get } from 'svelte/store';
import type { FetchedGrades } from '../models/fetchedGrades';

export const fetchedGrades = writable<FetchedGrades[]>([]);

export function addFetchedGrades(newGrades: FetchedGrades) {
	fetchedGrades.update((grades) => [...grades, newGrades]);
}

export function hasFetchedGrades(schoolYearIndex: number) {
	return !!get(fetchedGrades).find((g) => g.schoolYearIndex === schoolYearIndex);
}
