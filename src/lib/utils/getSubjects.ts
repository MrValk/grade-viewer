import type Magister from 'magister-scraper';
import type { MagisterSubject, Subject } from '$models/subject';
import type { SchoolYear } from '$models/schoolYear';

export default async function getSubjects(
	client: Magister,
	schoolYear: SchoolYear
): Promise<Subject[]> {
	// Call the Magister API to get all subjects
	const response = await client.get(
		`https://${client.hostname}/api/personen/${client.userId}/aanmeldingen/${schoolYear.id}/vakken`
	);

	// Format the data to fit the Subject type and return it
	return response.map((subject: MagisterSubject): Subject => {
		return {
			id: subject.id,
			abbreviation: subject.afkorting,
			name: subject.omschrijving,
			teacher: subject.docent
		};
	});
}
