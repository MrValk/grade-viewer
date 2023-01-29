import type { Grade } from '$models/grade';

export function getGradeTypes(grades: Grade[]): string[] {
	return [
		...new Set(
			grades.map((grade) => {
				return grade.type;
			})
		)
	];
}
