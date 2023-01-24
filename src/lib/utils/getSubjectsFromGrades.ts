import type { Grade } from '$models/grade';

export default function getSubjectsFromGrades(grades: Grade[]): string[] {
	const subjects: string[] = [];
	grades.forEach((grade) => {
		if (!subjects.includes(grade.subject.abbreviation)) subjects.push(grade.subject.abbreviation);
	});
	return subjects;
}
