<script lang="ts">
	import GradesTable from '$components/cijfers/GradesTable.svelte';
	import FetchError from '$components/cijfers/FetchError.svelte';
	import Fetching from '$components/cijfers/Fetching.svelte';
	import YearSelector from '$components/cijfers/YearSelector.svelte';
	import { schoolYearIndex } from '$stores/schoolYearIndex';
	import { fetchedGrades, addFetchedGrades, hasFetchedGrades } from '$stores/fetchedGrades';
	import getFetchedGradesIndex from '$utils/getFetchedGradesIndex';
	import { fetchFailed, addFetchFailed, removeFetchFailed } from '$stores/fetchFailed';

	import type { LayoutServerData } from '../$types';
	export let data: LayoutServerData;

	let grades = data.grades;
	let fetching: boolean = false;

	addFetchedGrades({
		schoolYearIndex: 0,
		grades: data.grades
	});

	async function fetchGrades() {
		try {
			console.log('Fetching for ' + $schoolYearIndex);
			fetching = true;

			const res = await fetch(`/api/grades/${$schoolYearIndex}`);
			const newGrades = await res.json();

			if (res.status !== 200) throw new Error(newGrades.message);

			addFetchedGrades({
				schoolYearIndex: $schoolYearIndex,
				grades: newGrades
			});

			if ($fetchFailed.includes($schoolYearIndex)) removeFetchFailed($schoolYearIndex);

			grades = newGrades;

			fetching = false;
		} catch (e) {
			addFetchFailed($schoolYearIndex);
			fetching = false;
		}
	}

	$: {
		const fetchedGradesIndex = getFetchedGradesIndex($fetchedGrades, $schoolYearIndex);

		console.log('fetchedGradesIndex: ', fetchedGradesIndex);

		if ($schoolYearIndex && !hasFetchedGrades($schoolYearIndex)) fetchGrades();
		else if (fetchedGradesIndex !== -1) grades = $fetchedGrades[fetchedGradesIndex].grades;
	}
</script>

<YearSelector schoolYears={data.schoolYears} {fetching} />
{#if fetching}
	<Fetching schoolYearName={data.schoolYears[$schoolYearIndex].study.name} />
{:else if $fetchFailed.includes($schoolYearIndex)}
	<FetchError schoolYearName={data.schoolYears[$schoolYearIndex].study.name} retry={fetchGrades} />
{:else}
	<GradesTable {grades} />
{/if}
