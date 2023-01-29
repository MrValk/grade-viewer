import type { Grade } from '$models/grade';

export function calcAverage(grades: Grade[]): number {
	const totalWeight = grades.reduce((acc, grade) => acc + grade.weight, 0);
	const totalScore = grades.reduce((acc, grade) => acc + grade.score * grade.weight, 0);
	return Math.round((totalScore / totalWeight) * 10) / 10;
}
