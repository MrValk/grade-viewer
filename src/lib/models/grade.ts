// The type returned by the Magister API
export type MagisterGrade = {
	CijferId: number;
	CijferStr: string;
	Vak: {
		Id: number;
		Omschrijving: string;
		Afkorting: string;
	};
	CijferKolom: {
		Id: string;
		KolomKop: string;
	};
	IngevoerdDoor: string | null;
	Docent: string | null;
	CijferPeriode: {
		Id: number;
		Naam: string;
	};
	DatumIngevoerd: string;
};

export type MagisterGradeInfo = {
	KolomNaam: string;
	KolomOmschrijving: string;
	Weging: number;
};

// The type returned by the getGrades function
export type Grade = {
	id: number;
	name: string;
	description: string;
	score: number;
	weight: number;
	subject: {
		id: number;
		name: string;
		abbreviation: string;
	};
	type: string;
	teacher: {
		name: string | null;
		abbreviation: string | null;
	};
	period: {
		id: number;
		name: string;
	};
	date: Date;
};
