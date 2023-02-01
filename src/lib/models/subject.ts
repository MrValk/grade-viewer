// The type returned by the Magister API
export type MagisterSubject = {
	id: number;
	afkorting: string;
	omschrijving: string;
	docent: string;
};

// The type returned by the getGrades function
export type Subject = {
	id: number;
	name: string;
	abbreviation: string;
	teacher: string;
};
