import type { Grade } from '$models/grade';

export type SubjectGrades = {
	subject: string;
	grades: Grade[];
};
