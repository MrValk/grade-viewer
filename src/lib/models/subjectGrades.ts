import type { Grade } from '$models/grade';
import type { Subject } from '$models/subject';

export type SubjectGrades = {
	subject: Subject;
	grades: Grade[];
	OV: {
		grade: number;
		weight: number;
	};
	PTA: {
		grade: number;
		weight: number;
	} | null;
};
