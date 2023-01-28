import type Magister from 'magister-scraper';
import type { Grade, MagisterGrade, MagisterGradeInfo } from '$models/grade';
import type { SchoolYear } from '$models/schoolYear';
import fs from 'fs';

export default async function getGrades(
	client: Magister,
	schoolYear: SchoolYear
): Promise<Grade[]> {
	// Call the Magister API to get all grades
	const response = await client.get(
		`https://${client.hostname}/api/personen/${client.userId}/aanmeldingen/${
			schoolYear.id
		}/cijfers/cijferoverzichtvooraanmelding${
			schoolYear.endDate ? `?peildatum=${schoolYear.endDate.toISOString().split('T')[0]}` : ''
		}`
	);

	// Filter out the grades that don't have a number score
	const filtered = response.Items.filter(
		(item: MagisterGrade) =>
			/\d/.test(item.CijferStr) &&
			item.CijferPeriode &&
			item.CijferKolom.KolomKop !== 'VT' &&
			item.CijferKolom.KolomKop !== 'Rp' &&
			item.CijferKolom.KolomKop !== 'SE' &&
			item.CijferPeriode.Naam !== 'PTA' &&
			item.CijferPeriode.Naam !== 'Eind'
	);
	// Sort by date
	filtered.sort((a: MagisterGrade, b: MagisterGrade) => {
		const dateA = new Date(a.DatumIngevoerd);
		const dateB = new Date(b.DatumIngevoerd);
		return dateA.getTime() - dateB.getTime();
	});

	// Format the data to fit the Grade type and return it
	const formatted = await Promise.all(
		filtered.map(async (grade: MagisterGrade): Promise<Grade> => {
			// Call the Magister API to get specific information on every grade
			const response: MagisterGradeInfo = await client.get(
				`https://${client.hostname}/api/personen/${client.userId}/aanmeldingen/${schoolYear.id}/cijfers/extracijferkolominfo/${grade.CijferKolom.Id}`
			);
			const { KolomNaam, KolomOmschrijving, Weging } = response;

			// Format the data to fit the Grade type
			return {
				id: grade.CijferId,
				name: KolomNaam,
				description: KolomOmschrijving,
				score: parseFloat(grade.CijferStr.replace(',', '.')),
				weight: Weging,
				subject: {
					id: grade.Vak.Id,
					name: grade.Vak.Omschrijving,
					abbreviation: grade.Vak.Afkorting
				},
				type: grade.CijferKolom.KolomKop,
				teacher: {
					name: grade.IngevoerdDoor ? grade.IngevoerdDoor.replace('  ', ' ') : null,
					abbreviation: grade.Docent
				},
				period: {
					id: grade.CijferPeriode.Id,
					name: grade.CijferPeriode.Naam
				},
				date: new Date(grade.DatumIngevoerd)
			};
		})
	);

	fs.writeFileSync('grades.json', JSON.stringify(formatted, null, 2));

	return formatted.filter(
		(grade: Grade) => grade.weight !== 0 && !grade.description.includes('overgangscijfer op')
	);
}
