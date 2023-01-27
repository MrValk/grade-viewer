import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$src/hooks.server';
import getSchoolYears from '$utils/getSchoolYears';
import getGrades from '$utils/getGrades';
import type { Grade } from '$models/grade';

export const GET: RequestHandler = async () => {
	const schoolYears = await getSchoolYears(client);

	let allGrades: Grade[][] = [];

	schoolYears.forEach(async (schoolYear) => {
		allGrades = [...allGrades, await getGrades(client, schoolYear)];
	});

	return json(allGrades);
};
