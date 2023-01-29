<script lang="ts">
	import { getSubjectsGrades } from '$utils/getSubjectsGrades';
	import { getGradeTypes } from '$utils/getGradeTypes';
	import { getTotalPTA } from '$utils/getTotalPTA';
	import { getTotalOV } from '$utils/getTotalOV';
	import type { SubjectGrades } from '$models/subjectGrades';
	import type { Grade } from '$models/grade';

	export let grades: Grade[];

	let subjectsGrades: SubjectGrades[] = [];
	let gradeTypes: string[] = [];
	let mostGrades: number = 0;
	let totalPTA = 0;
	let totalOV = 0;

	$: {
		subjectsGrades = getSubjectsGrades(grades);
		gradeTypes = getGradeTypes(grades);
		mostGrades = Math.max(...subjectsGrades.map((subjectGrades) => subjectGrades.grades.length));
		totalPTA = getTotalPTA(subjectsGrades);
		totalOV = getTotalOV(subjectsGrades);
	}
</script>

<section class="flex flex-col w-fit items-end gap-6">
	<table class="text-lg border-hidden rounded-md shadow-zinc-900 shadow-xl bg-zinc-500/70">
		<thead class="h-10">
			<th class="bg-zinc-700 rounded-tl-md">Vak</th>
			<th class="bg-zinc-700" colspan={mostGrades}>Cijfers & Wegingen</th>
			{#if gradeTypes.includes('PTA')}
				<th class={`bg-zinc-700 ${!gradeTypes.includes('OV') ? 'rounded-tr-md' : ''}`}>PTA</th>
			{/if}
			{#if gradeTypes.includes('OV')}
				<th class="bg-zinc-700 rounded-tr-md">Overgang</th>
			{/if}
		</thead>
		<colgroup>
			<col class="w-48" />
			{#each Array(mostGrades) as _}
				<col class="w-cell" />
			{/each}
			{#if gradeTypes.includes('PTA')}
				<col class="w-2cell" />
			{/if}
			{#if gradeTypes.includes('OV')}
				<col class="w-2cell" />
			{/if}
		</colgroup>
		<tbody>
			{#each subjectsGrades as subjectGrades, i}
				<tr class={`h-cell ${subjectsGrades.length === i + 1 ? 'last-grade-row' : ''}`}>
					<td class="bg-zinc-600"><h4 class="pl-6">{subjectGrades.subject}</h4></td>
					{#each Array(mostGrades) as _, i}
						{#if subjectGrades.grades[i]}
							<td
								class={`p-0 border-zinc-600/60 border ${
									subjectGrades.grades[i].type === 'OV' ? 'bg-zinc-600/50' : ''
								}`}
								><p class="flex justify-center items-center">
									{subjectGrades.grades[i].score.toLocaleString(undefined, {
										maximumFractionDigits: 1,
										minimumFractionDigits: 1
									})}
								</p>
								<p class="flex justify-center items-center text-sm text-zinc-400">
									{subjectGrades.grades[i].weight.toLocaleString()}
								</p>
							</td>
						{:else}
							<td class="w-cell h-cell border-zinc-600/60 border" />
						{/if}
					{/each}
					{#if gradeTypes.includes('PTA')}
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
					{#if gradeTypes.includes('OV')}
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
	<section class="flex text-lg bg-zinc-500/70 shadow-xl rounded-md overflow-hidden w-fit">
		<h5 class="flex items-center justify-center w-2cell h-cell font-bold bg-zinc-700">Totaal</h5>
		{#if gradeTypes.includes('PTA')}
			<p
				class="flex items-center justify-center w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-l"
			>
				{totalPTA.toLocaleString(undefined, {
					maximumFractionDigits: 1,
					minimumFractionDigits: 1
				})}
			</p>
		{/if}
		{#if gradeTypes.includes('OV')}
			<p
				class="flex items-center justify-center w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-l"
			>
				{totalOV.toLocaleString(undefined, {
					maximumFractionDigits: 1,
					minimumFractionDigits: 1
				})}
			</p>{/if}
	</section>
</section>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.w-cell {
		width: $cellWidth;
	}

	.w-2cell {
		width: calc(2 * $cellWidth);
	}

	.h-cell {
		height: $cellWidth;
	}

	.last-grade-row td:first-child {
		border-bottom-left-radius: 0.375rem;
	}

	.last-grade-row td:last-child {
		border-bottom-right-radius: 0.375rem;
	}
</style>
