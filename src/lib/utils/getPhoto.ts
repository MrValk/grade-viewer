/* eslint-disable @typescript-eslint/ban-ts-comment */
import type Magister from 'magister-scraper';
import got from 'got';

// Get a student's photo
export default async function getPhoto(client: Magister): Promise<string> {
	// Call the Magister API to get the photo
	return (
		await got(`https://${client.hostname}/api/leerlingen/${client.userId}/foto`, {
			cookieJar: client.cookieJar,
			headers: {
				authorization: `Bearer ${client.accessToken}`
			}
		}).buffer()
	).toString('base64');
}
