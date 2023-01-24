import Magister from 'magister-scraper';
import { MAGISTER_USERNAME, MAGISTER_PASSWORD, MAGISTER_HOSTNAME } from '$env/static/private';

// Initialize Magister client
export const client = await Magister.new({
	username: MAGISTER_USERNAME || '',
	password: MAGISTER_PASSWORD || '',
	hostname: MAGISTER_HOSTNAME || ''
});
