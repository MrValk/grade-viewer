import type { FetchedSubjects } from '$models/fetchedSubjects';

export default function getFetchedSubjectsIndex(
	fetchedSubjects: FetchedSubjects[],
	schoolYearIndex: number
) {
	return fetchedSubjects.findIndex(
		(fetchedSubjects) => fetchedSubjects.schoolYearIndex === schoolYearIndex
	);
}
