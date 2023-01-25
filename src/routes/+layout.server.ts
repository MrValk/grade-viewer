import type { SchoolYear } from '$models/schoolYear';
import type { Grade } from '$src/lib/models/grade';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	async function fetchSchoolYears(): Promise<SchoolYear[]> {
		const res = await fetch('/api/schoolYears');
		return (await res.json()) as SchoolYear[];
	}

	async function fetchGrades(): Promise<Grade[]> {
		const res = await fetch(`/api/grades/0`);
		return await res.json();
	}

	async function fetchPhoto(): Promise<string> {
		const res = await fetch(`/api/photo`);
		return await res.json();
	}

	async function fetchName(): Promise<string> {
		const res = await fetch(`/api/name`);
		return await res.json();
	}

	return {
		grades: await fetchGrades(),
		schoolYears: await fetchSchoolYears(),
		photo: await fetchPhoto(),
		name: await fetchName()
	};
};
