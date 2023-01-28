import type { FetchedGrades } from '$models/fetchedGrades';

export default function getFetchedGradesIndex(
	fetchedGrades: FetchedGrades[],
	schoolYearIndex: number
) {
	return fetchedGrades.findIndex(
		(fetchedGrades) => fetchedGrades.schoolYearIndex === schoolYearIndex
	);
}
