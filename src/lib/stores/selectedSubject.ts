import { writable } from 'svelte/store';
import type { Subject } from '$models/subject';

export const selectedSubject = writable<Subject | null>();

export function setSelectedSubject(subject: Subject) {
	selectedSubject.set(subject);
}

export function resetSelectedSubject() {
	selectedSubject.set(null);
}
