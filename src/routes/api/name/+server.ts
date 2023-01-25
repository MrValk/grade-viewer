import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$src/hooks.server';
import getName from '$utils/getName';

export const GET: RequestHandler = async () => {
	const name = await getName(client);

	return json(name);
};
