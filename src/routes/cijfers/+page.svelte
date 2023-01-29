<script lang="ts">
	import GradesTable from '$components/cijfers/GradesTable.svelte';
	import TotalAverage from '$components/cijfers/TotalAverage.svelte';
	import GradeInfo from '$components/cijfers/GradeInfo.svelte';
	import Placeholder from '$components/cijfers/Placeholder.svelte';
	import FetchError from '$components/cijfers/FetchError.svelte';
	import Fetching from '$components/cijfers/Fetching.svelte';
	import YearSelector from '$components/cijfers/YearSelector.svelte';

	import { schoolYearIndex } from '$stores/schoolYearIndex';
	import { fetchedGrades, addFetchedGrades, hasFetchedGrades } from '$stores/fetchedGrades';
	import { fetchFailed, addFetchFailed, removeFetchFailed } from '$stores/fetchFailed';

	import getFetchedGradesIndex from '$utils/getFetchedGradesIndex';

	import type { LayoutServerData } from '../$types';
	import { resetSelectedGrade } from '$src/lib/stores/selectedGrade';
	export let data: LayoutServerData;

	$: grades = data.grades;
	let fetching: boolean = false;

	addFetchedGrades({
		schoolYearIndex: 0,
		grades: data.grades
	});

	async function fetchGrades() {
		try {
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

		if ($schoolYearIndex && !hasFetchedGrades($schoolYearIndex)) fetchGrades();
		else if (fetchedGradesIndex !== -1) grades = $fetchedGrades[fetchedGradesIndex].grades;

		resetSelectedGrade();
	}
</script>

<YearSelector schoolYears={data.schoolYears} {fetching} />

<section class="flex justify-between gap-12">
	{#if fetching}
		<Fetching schoolYearName={data.schoolYears[$schoolYearIndex].study.name} />
	{:else if $fetchFailed.includes($schoolYearIndex)}
		<FetchError
			schoolYearName={data.schoolYears[$schoolYearIndex].study.name}
			retry={fetchGrades}
		/>
	{:else if grades}
		<section class="flex flex-col w-fit gap-6">
			<GradesTable {grades} />
			<div class="flex justify-between h-cell gap-6 flex-grow">
				<Placeholder />
				<TotalAverage />
			</div>
		</section>
		<section class="flex flex-col flex-grow gap-6">
			<GradeInfo />
			<div>
				<Placeholder />
			</div>
		</section>
	{/if}
</section>

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
