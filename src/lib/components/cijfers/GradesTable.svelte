<script lang="ts">
	import { getSubjectsGrades } from '$utils/getSubjectsGrades';
	import { getGradeTypes } from '$utils/getGradeTypes';

	import type { Grade } from '$models/grade';
	import type { Subject } from '$models/subject';

	import { subjectsGrades, setSubjectsGrades } from '$stores/subjectsGrades';
	import { gradeTypes, setGradeTypes } from '$stores/gradeTypes';

	import { selectedGrade, setSelectedGrade, resetSelectedGrade } from '$stores/selectedGrade';
	import {
		selectedSubject,
		setSelectedSubject,
		resetSelectedSubject
	} from '$src/lib/stores/selectedSubject';

	export let grades: Grade[];
	export let subjects: Subject[];

	let mostGrades: number = 0;

	$: {
		setSubjectsGrades(getSubjectsGrades(grades, subjects));
		setGradeTypes(getGradeTypes(grades));
		mostGrades = Math.max(...$subjectsGrades.map((subjectGrades) => subjectGrades.grades.length));
	}
</script>

<table class="text-lg w-fit border-hidden rounded-md shadow-zinc-900 shadow-xl bg-zinc-500/70">
	<thead class="h-10">
		<th class="bg-zinc-700 rounded-tl-md">Vak</th>
		<th class="bg-zinc-700" colspan={mostGrades}>Cijfers & Wegingen</th>
		{#if $gradeTypes.includes('PTA')}
			<th class={`bg-zinc-700 ${!$gradeTypes.includes('OV') ? 'rounded-tr-md' : ''}`}>PTA</th>
		{/if}
		{#if $gradeTypes.includes('OV')}
			<th class="bg-zinc-700 rounded-tr-md">Overgang</th>
		{/if}
	</thead>
	<colgroup>
		<col class="w-48" />
		{#each Array(mostGrades) as _}
			<col class="w-cell" />
		{/each}
		{#if $gradeTypes.includes('PTA')}
			<col class="w-2cell" />
		{/if}
		{#if $gradeTypes.includes('OV')}
			<col class="w-2cell" />
		{/if}
	</colgroup>
	<tbody>
		{#each $subjectsGrades as subjectGrades, i}
			<tr class={`h-cell ${$subjectsGrades.length === i + 1 ? 'last-grade-row' : ''}`}>
				<td
					class={$selectedSubject && $selectedSubject.id === subjectGrades.subject.id
						? '!bg-zinc-700/50 font-bold'
						: 'bg-zinc-600'}
					><button
						class="w-48 h-cell outline-none"
						on:click={() => {
							setSelectedSubject(subjectGrades.subject);
							resetSelectedGrade();
						}}><h4 class="pl-6 text-left">{subjectGrades.subject.abbreviation}</h4></button
					></td
				>
				{#each Array(mostGrades) as _, i}
					{#if subjectGrades.grades[i]}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<td
							class={`p-0 border-zinc-600/60 border ${
								subjectGrades.grades[i].type === 'OV' ? 'bg-zinc-600/50' : ''
							} ${
								$selectedGrade && $selectedGrade.id === subjectGrades.grades[i].id
									? '!bg-zinc-700/50 font-bold'
									: ''
							} transition`}
						>
							<button
								class="flex flex-col justify-center items-center w-cell h-cell outline-none"
								on:click={() => {
									setSelectedGrade(subjectGrades.grades[i]);
									resetSelectedSubject();
								}}
							>
								<p>
									{subjectGrades.grades[i].score.toLocaleString(undefined, {
										maximumFractionDigits: 1,
										minimumFractionDigits: 1
									})}
								</p>
								<p class="text-sm text-zinc-400">
									{subjectGrades.grades[i].weight.toLocaleString()}
								</p>
							</button>
						</td>
					{:else}
						<td class="w-cell h-cell border-zinc-600/60 border" />
					{/if}
				{/each}
				{#if $gradeTypes.includes('PTA')}
					<td class="p-0 w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-t"
						><p class="flex justify-center items-center">
							{subjectGrades.PTA
								? subjectGrades.PTA.grade.toLocaleString(undefined, {
										maximumFractionDigits: 1,
										minimumFractionDigits: 1
								  })
								: '-'}
						</p>
						{#if subjectGrades.PTA && subjectGrades.PTA.weight}
							<p class="flex justify-center items-center text-sm text-zinc-400">
								{subjectGrades.PTA.weight.toLocaleString()}
							</p>
						{/if}
					</td>
				{/if}
				{#if $gradeTypes.includes('OV')}
					<td class="p-0 w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-t border-l"
						><p class="flex justify-center items-center">
							{subjectGrades.OV
								? subjectGrades.OV.grade.toLocaleString(undefined, {
										maximumFractionDigits: 1,
										minimumFractionDigits: 1
								  })
								: '-'}
						</p>
						{#if subjectGrades.OV && subjectGrades.OV.weight}
							<p class="flex justify-center items-center text-sm text-zinc-400">
								{subjectGrades.OV.weight.toLocaleString()}
							</p>
						{/if}
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	table {
		flex: 0 0 auto;
	}

	.last-grade-row td:first-child {
		border-bottom-left-radius: 0.375rem;
	}

	.last-grade-row td:last-child {
		border-bottom-right-radius: 0.375rem;
	}
</style>
