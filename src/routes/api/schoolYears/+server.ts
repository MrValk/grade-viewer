import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$src/hooks.server';
import getSchoolYears from '$utils/getSchoolYears';

export const GET: RequestHandler = async () => {
	const schoolYears = await getSchoolYears(client);

	return json(schoolYears);
};
