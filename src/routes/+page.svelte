<script lang="ts">
	import GradesTable from '$components/cijfers/GradesTable.svelte';
	import TotalAverage from '$components/cijfers/TotalAverage.svelte';
	import Info from '$components/cijfers/Info.svelte';
	import GradeInfo from '$components/cijfers/GradeInfo.svelte';
	import SubjectInfo from '$components/cijfers/SubjectInfo.svelte';
	import CumLaude from '$components/cijfers/CumLaude.svelte';
	import ToggleCalcGrade from '$components/cijfers/ToggleCalcGrade.svelte';
	import FetchError from '$components/cijfers/FetchError.svelte';
	import Fetching from '$components/cijfers/Fetching.svelte';
	import YearSelector from '$components/cijfers/YearSelector.svelte';

	import { schoolYearIndex } from '$stores/schoolYearIndex';
	import { fetchedGrades, addFetchedGrades, hasFetchedGrades } from '$stores/fetchedGrades';
	import { fetchedSubjects, addFetchedSubjects, hasFetchedSubjects } from '$stores/fetchedSubjects';
	import { fetchFailed, addFetchFailed, removeFetchFailed } from '$stores/fetchFailed';
	import { selectedGrade } from '$stores/selectedGrade';
	import { selectedSubject } from '$stores/selectedSubject';

	import getFetchedGradesIndex from '$utils/getFetchedGradesIndex';
	import getFetchedSubjectsIndex from '$utils/getFetchedSubjectsIndex';

	import type { LayoutServerData } from './$types';
	import { resetSelectedGrade } from '$src/lib/stores/selectedGrade';
	import { resetSelectedSubject } from '$src/lib/stores/selectedSubject';
	import type { FetchedGrades } from '$src/lib/models/fetchedGrades';
	import type { FetchedSubjects } from '$src/lib/models/fetchedSubjects';
	export let data: LayoutServerData;

	let grades = data.grades;
	let subjects = data.subjects;
	let fetching: boolean = false;

	addFetchedGrades({
		schoolYearIndex: 0,
		grades
	});

	addFetchedSubjects({
		schoolYearIndex: 0,
		subjects
	});

	async function fetchGradesAndSubjects() {
		try {
			fetching = true;
			console.log('Fetching...');

			const res1 = await fetch(`/api/grades/${$schoolYearIndex}`);
			const newGrades = await res1.json();

			if (res1.status !== 200) throw new Error(newGrades.message);

			const res2 = await fetch(`/api/subjects/${$schoolYearIndex}`);
			const newSubjects = await res2.json();

			if (res2.status !== 200) throw new Error(newGrades.message);

			if (newGrades.length === 0 || newSubjects.length === 0)
				throw new Error('No grades or subjects found');

			addFetchedGrades({
				schoolYearIndex: $schoolYearIndex,
				grades: newGrades
			});

			addFetchedSubjects({
				schoolYearIndex: $schoolYearIndex,
				subjects: newSubjects
			});

			if ($fetchFailed.includes($schoolYearIndex)) removeFetchFailed($schoolYearIndex);

			grades = newGrades;
			subjects = newSubjects;

			fetching = false;
			console.log('Done!');
		} catch (e) {
			console.log('Failed');
			addFetchFailed($schoolYearIndex);
			fetching = false;
		}
	}

	$: getNewData($fetchedGrades, $fetchedSubjects, $schoolYearIndex);

	async function getNewData(
		fetchedGrades: FetchedGrades[],
		fetchedSubjects: FetchedSubjects[],
		schoolYearIndex: number
	) {
		if (fetching) return;

		const fetchedGradesIndex = getFetchedGradesIndex(fetchedGrades, schoolYearIndex);
		const fetchedSubjectsIndex = getFetchedSubjectsIndex(fetchedSubjects, schoolYearIndex);

		if (schoolYearIndex && !hasFetchedGrades(schoolYearIndex)) await fetchGradesAndSubjects();
		else if (fetchedGradesIndex !== -1) grades = fetchedGrades[fetchedGradesIndex].grades;

		if ($fetchFailed.includes(schoolYearIndex)) return;

		if (schoolYearIndex && !hasFetchedSubjects(schoolYearIndex)) await fetchGradesAndSubjects();
		else if (fetchedSubjectsIndex !== -1) subjects = fetchedSubjects[fetchedSubjectsIndex].subjects;

		resetSelectedGrade();
		resetSelectedSubject();
	}
</script>

<YearSelector schoolYears={data.schoolYears} {fetching} />

<section class="flex justify-between gap-12">
	{#if fetching}
		<Fetching schoolYearName={data.schoolYears[$schoolYearIndex].study.name} />
	{:else if $fetchFailed.includes($schoolYearIndex)}
		<FetchError
			schoolYearName={data.schoolYears[$schoolYearIndex].study.name}
			retry={fetchGradesAndSubjects}
		/>
	{:else if grades && subjects}
		<section class="flex flex-col w-fit gap-6">
			<GradesTable {grades} {subjects} />
			<div class="flex justify-between h-cell gap-6 flex-grow">
				<CumLaude />
				<TotalAverage />
			</div>
		</section>
		<section class="flex flex-col flex-grow gap-6">
			<Info>
				{#if $selectedGrade}
					<GradeInfo />
				{:else if $selectedSubject}
					<SubjectInfo />
				{/if}
			</Info>
			<div>
				<ToggleCalcGrade />
			</div>
		</section>
	{/if}
</section>

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
