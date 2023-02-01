import type { Subject } from '$models/subject';

export type FetchedSubjects = {
	schoolYearIndex: number;
	subjects: Subject[];
};
