import type { Grade } from '$models/grade';

export type SubjectGrades = {
	subject: string;
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
