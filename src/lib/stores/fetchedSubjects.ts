import { writable, get } from 'svelte/store';
import type { FetchedSubjects } from '$models/fetchedSubjects';

export const fetchedSubjects = writable<FetchedSubjects[]>([]);

export function addFetchedSubjects(newSubjects: FetchedSubjects) {
	fetchedSubjects.update((grades) => [...grades, newSubjects]);
}

export function hasFetchedSubjects(schoolYearIndex: number) {
	return !!get(fetchedSubjects).find((g) => g.schoolYearIndex === schoolYearIndex);
}
