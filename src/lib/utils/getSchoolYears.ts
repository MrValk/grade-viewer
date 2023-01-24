import type Magister from 'magister-scraper';
import type { SchoolYear, MagisterSchoolYear } from '$models/schoolYear';

// Get all school years
export default async function getSchoolYears(client: Magister): Promise<SchoolYear[]> {
	// Call the Magister API to get all school years
	const response = await client.get(
		`https://${client.hostname}/api/leerlingen/${client.userId}/aanmeldingen?begin=1970-1-1`
	);

	// Format the data to fit the SchoolYear type and return it
	return response.items.map((item: MagisterSchoolYear): SchoolYear => {
		let mentor = null;
		let profiles = null;

		// Format the mentor data (if they exist)
		if (item.persoonlijkeMentor)
			mentor = {
				id: parseInt(item.persoonlijkeMentor.links.self.href.split('/').pop() || ''),
				name: `${item.persoonlijkeMentor.voorletters} ${item.persoonlijkeMentor.tussenvoegsel} ${item.persoonlijkeMentor.achternaam}`
			};

		// Format the profiles data (if it exists)
		if (item.profielen.length > 0)
			profiles = item.profielen.map((profiel) => ({
				id: parseInt(profiel.links.self.href.split('/').pop() || ''),
				name: profiel.code.replace('-A', '')
			}));

		// Format the data to fit the SchoolYear type
		return {
			id: item.id,
			study: {
				id: item.studie.id,
				name: item.studie.code.replace('A ', '')
			},
			group: {
				id: item.groep.id,
				name: item.groep.code.replace('A', '')
			},
			profiles,
			mentor,
			startDate: new Date(item.begin),
			endDate: new Date(item.einde)
		};
	});
}
