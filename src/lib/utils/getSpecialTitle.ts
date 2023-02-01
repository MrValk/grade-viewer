/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { SubjectGrades } from '$models/subjectGrades';
import { getTotalOV } from '$utils/getTotalOV';
import { getTotalPTA } from '$utils/getTotalPTA';

export function getSpecialTitle(
	subjectsGrades: SubjectGrades[],
	gradeTypes: string[]
): string | null {
	let average = 0;
	let lowestGrade = 0;

	if (gradeTypes.includes('OV')) {
		average = getTotalOV(subjectsGrades);
		lowestGrade = Math.min(...subjectsGrades.map((subjectGrades) => subjectGrades.OV.grade));
	} else if (gradeTypes.includes('PTA')) {
		average = getTotalPTA(subjectsGrades);
		//@ts-ignore
		lowestGrade = Math.min(...subjectsGrades.map((subjectGrades) => subjectGrades.PTA.grade));
	}

	if (lowestGrade < 7) return null;

	if (average >= 9) return 'Summa Cum Laude';
	else if (average >= 8.5) return 'Magna Cum Laude';
	else if (average >= 8) return 'Cum Laude';

	return null;
}
