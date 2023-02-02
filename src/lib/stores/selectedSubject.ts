import { writable } from 'svelte/store';
import type { SubjectGrades } from '$models/subjectGrades';

export const selectedSubject = writable<SubjectGrades | null>();

export function setSelectedSubject(subject: SubjectGrades) {
	selectedSubject.set(subject);
}

export function resetSelectedSubject() {
	selectedSubject.set(null);
}
