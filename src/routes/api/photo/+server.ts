import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$src/hooks.server';
import getPhoto from '$utils/getPhoto';

export const GET: RequestHandler = async () => {
	const photo = await getPhoto(client);

	return json(photo);
};
