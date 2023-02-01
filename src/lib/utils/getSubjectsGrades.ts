import type { Average } from '$models/average';
import type { Grade } from '$models/grade';
import type { SubjectGrades } from '$models/subjectGrades';
import { calcAverage } from '$utils/calcAverage';
import { getSubjectIds } from '$src/lib/utils/getSubjectIds';
import type { Subject } from '../models/subject';

export function getSubjectsGrades(grades: Grade[], subjects: Subject[]): SubjectGrades[] {
	const subjectIds = getSubjectIds(grades);
	const filteredSubjects = subjects.filter((subject) => subjectIds.includes(subject.id));

	let subjectGradesArr: SubjectGrades[] = [];

	filteredSubjects.forEach((subject) => {
		const subjectGrades = grades.filter((grade) => grade.subject.id === subject.id);
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
