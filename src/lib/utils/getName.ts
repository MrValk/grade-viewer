import type Magister from 'magister-scraper';

// Get all school years
export default async function getName(client: Magister): Promise<string> {
	// Call the Magister API to get all school years
	const response = await client.get(`https://${client.hostname}/api/leerlingen/${client.userId}`);

	const { roepnaam, tussenvoegsel, achternaam } = response;

	return `${roepnaam} ${tussenvoegsel ? tussenvoegsel + ' ' : ''}${achternaam}`;
}
