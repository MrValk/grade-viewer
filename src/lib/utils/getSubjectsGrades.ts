import type { Average } from '$models/average';
import type { Grade } from '$models/grade';
import type { SubjectGrades } from '$models/subjectGrades';
import { calcAverage } from '$utils/calcAverage';
import { getSubjects } from '$src/lib/utils/getSubjects';

export function getSubjectsGrades(grades: Grade[]): SubjectGrades[] {
	const subjects = getSubjects(grades).sort();
	let subjectGradesArr: SubjectGrades[] = [];

	subjects.forEach((subject) => {
		const subjectGrades = grades.filter((grade) => grade.subject.abbreviation === subject);
		const PTAGrades = subjectGrades.filter((grade) => grade.type === 'PTA');
		const OVGrades = subjectGrades;

		let PTA: Average = null;
		const OV: Average = {
			grade: calcAverage(OVGrades),
			weight: OVGrades.reduce((acc, grade) => acc + grade.weight, 0)
		};

		if (PTAGrades.length)
			PTA = {
				grade: calcAverage(PTAGrades),
				weight: PTAGrades.reduce((acc, grade) => acc + grade.weight, 0)
			};

		subjectGradesArr = [...subjectGradesArr, { subject, grades: subjectGrades, PTA, OV }];
	});

	return subjectGradesArr;
}
