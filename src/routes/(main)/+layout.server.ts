import type { SchoolYear } from '$models/schoolYear';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	async function getMagisterAuth() {
		const magisterAuth = await cookies.get('magisterAuth');
		console.log(magisterAuth);
	}

	async function fetchSchoolYears(): Promise<SchoolYear[]> {
		const res = await fetch('/api/schoolYears');
		return (await res.json()) as SchoolYear[];
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
		schoolYears: await fetchSchoolYears(),
		photo: await fetchPhoto(),
		name: await fetchName()
	};
};
