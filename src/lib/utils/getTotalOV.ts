import type { SubjectGrades } from '$models/subjectGrades';

export function getTotalOV(subjectsGrades: SubjectGrades[]): number {
	return (
		subjectsGrades.reduce((acc, subjectGrades) => {
			return acc + subjectGrades.OV.grade;
		}, 0) / subjectsGrades.length
	);
}
