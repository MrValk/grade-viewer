<script lang="ts">
	import GradesTable from '$components/cijfers/GradesTable.svelte';
	import YearSelector from '$components/cijfers/YearSelector.svelte';
	import { schoolYearIndex } from '$stores/schoolYearIndex';
	import { fetchedGrades, addFetchedGrades, hasFetchedGrades } from '$stores/fetchedGrades';

	import type { LayoutServerData } from '../$types';
	export let data: LayoutServerData;

	let grades = data.grades;
	let fetchFailed = false;

	addFetchedGrades({
		schoolYearIndex: 0,
		grades: data.grades
	});

	async function fetchGrades() {
		try {
			console.log('Fetching for ' + $schoolYearIndex);
			const res = await fetch(`/api/grades/${$schoolYearIndex}`);
			const newGrades = await res.json();

			if (res.status !== 200) throw new Error(newGrades.message);

			addFetchedGrades({
				schoolYearIndex: $schoolYearIndex,
				grades: newGrades
			});

			grades = newGrades;
			console.log('Page.svelte:', grades);
		} catch (e) {
			console.error(e);
			fetchFailed = true;
		}
	}

	$: {
		const fetchedGradesIndex = $fetchedGrades.findIndex(
			(fetchedGrades) => fetchedGrades.schoolYearIndex === $schoolYearIndex
		);

		console.log('fetchedGradesIndex: ', fetchedGradesIndex);

		if ($schoolYearIndex && !hasFetchedGrades($schoolYearIndex)) fetchGrades();
		else if (fetchedGradesIndex !== -1) grades = $fetchedGrades[fetchedGradesIndex].grades;
	}
</script>

<YearSelector schoolYears={data.schoolYears} />
<GradesTable {grades} />
