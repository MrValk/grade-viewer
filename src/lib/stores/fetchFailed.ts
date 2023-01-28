import { writable } from 'svelte/store';

export const fetchFailed = writable<number[]>([]);

export function addFetchFailed(schoolYearIndex: number) {
	fetchFailed.update((failed) => {
		if (failed.includes(schoolYearIndex)) return failed;
		return [...failed, schoolYearIndex];
	});
}

export function removeFetchFailed(schoolYearIndex: number) {
	fetchFailed.update((failed) => {
		return failed.filter((failed) => failed !== schoolYearIndex);
	});
}
