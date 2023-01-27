import type { Grade } from '$models/grade';

export type FetchedGrades = {
	schoolYearIndex: number;
	grades: Grade[];
};
