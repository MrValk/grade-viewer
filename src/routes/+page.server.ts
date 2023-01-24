import type { SchoolYear } from '$models/schoolYear';
import type { Grade } from '$src/lib/models/grade';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	async function fetchSchoolYears(): Promise<SchoolYear[]> {
		const res = await fetch('/api/schoolYears');
		return (await res.json()) as SchoolYear[];
	}

	async function fetchGrades(): Promise<Grade[]> {
		const res2 = await fetch(`/api/grades/0`);
		return await res2.json();
	}

	return {
		grades: await fetchGrades(),
		schoolYears: await fetchSchoolYears()
	};
};
