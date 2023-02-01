import type { Grade } from '$models/grade';

export function getSubjectIds(grades: Grade[]): number[] {
	const subjectIds: number[] = [];
	grades.forEach((grade) => {
		if (!subjectIds.includes(grade.subject.id)) subjectIds.push(grade.subject.id);
	});
	return subjectIds;
}
