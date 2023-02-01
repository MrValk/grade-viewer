import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$src/hooks.server';
import getSchoolYears from '$utils/getSchoolYears';
import getSubjects from '$utils/getSubjects';

export const GET: RequestHandler = async ({ params }) => {
	let schoolYearIndex: string | number | undefined = params.schoolYearIndex;
	if (!schoolYearIndex) return json('Missing schoolYearIndex', { status: 400 });

	schoolYearIndex = parseInt(schoolYearIndex);
	if (isNaN(schoolYearIndex)) return json('schoolYearIndex is not a number', { status: 404 });

	const schoolYear = (await getSchoolYears(client))[schoolYearIndex];

	if (!schoolYear) return json('School year not found', { status: 404 });

	const subjects = await getSubjects(client, schoolYear);

	return json(subjects);
};
