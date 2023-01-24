// The type returned by the Magister API
export type MagisterSchoolYear = {
	id: number;
	studie: {
		id: number;
		code: string;
	};
	groep: {
		id: number;
		code: string;
	};
	profielen:
		| [
				{
					code: string;
					links: {
						self: { href: string }; // /api/profielen/3132
					};
				}
		  ]
		| [];
	persoonlijkeMentor: {
		voorletters: string;
		tussenvoegsel: string;
		achternaam: string;
		links: {
			self: {
				href: string; // /api/medewerkers/31321
			};
		};
	} | null;
	begin: string;
	einde: string;
};

// The type returned by the getSchoolYears function
export type SchoolYear = {
	id: number;

	// VWO 4
	study: {
		id: number;
		name: string;
	};

	// 4v1
	group: {
		id: number;
		name: string;
	};

	// NT-A
	profiles: { id: number; name: string }[] | null;

	mentor: {
		id: number;
		name: string;
	} | null;

	startDate: Date;
	endDate: Date;
};
