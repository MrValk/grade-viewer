/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { SubjectGrades } from '$models/subjectGrades';

export function getTotalPTA(subjectsGrades: SubjectGrades[]): number {
	const PTAGrades = subjectsGrades.filter((subjectGrades) => subjectGrades.PTA);

	return (
		PTAGrades.reduce((acc, PTAGrade) => {
			//@ts-ignore
			return acc + PTAGrade.PTA.grade;
		}, 0) / PTAGrades.length
	);
}
