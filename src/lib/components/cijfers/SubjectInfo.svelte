<script lang="ts">
	import GradeTypeSelector from '$components/cijfers/GradeTypeSelector.svelte';

	import { selectedSubject } from '$stores/selectedSubject';
	import { calcGrade } from '$stores/calcGrade';

	import { getGradeTypes } from '$utils/getGradeTypes';

	let gradeTypes: string[] = [];
	$: if ($selectedSubject) gradeTypes = getGradeTypes($selectedSubject.grades);

	$: subjectData = [
		{
			tag: 'Naam',
			value: `${$selectedSubject?.subject.abbreviation} (${$selectedSubject?.subject.name})`
		},
		{
			tag: 'Docent',
			value: $selectedSubject?.subject.teacher
		},
		{
			tag: 'PTA',
			value: gradeTypes.includes('PTA')
				? $selectedSubject?.PTA?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  }) + ` (${$selectedSubject?.PTA?.weight.toLocaleString()})`
				: null
		},
		{
			tag: 'OV',
			value: gradeTypes.includes('OV')
				? $selectedSubject?.OV?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  }) + ` (${$selectedSubject?.OV?.weight.toLocaleString()})`
				: null
		},
		{
			tag: 'Aantal cijfers',
			value: $selectedSubject?.grades.length
		}
	];

	$: calcData = [
		{
			tag: 'PTA',
			score: gradeTypes.includes('PTA')
				? $selectedSubject?.PTA?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  })
				: null,
			weight: $selectedSubject?.PTA?.weight
		},
		{
			tag: 'OV',
			score: gradeTypes.includes('OV')
				? $selectedSubject?.OV?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  })
				: null,
			weight: $selectedSubject?.OV?.weight
		}
	];
</script>

{#if !$calcGrade}
	<table class="text-lg border-hidden w-full">
		<thead class="h-10">
			<th colspan="2" class="bg-zinc-700 rounded-t-md">Vak Info</th>
		</thead>
		<colgroup>
			<col class="w-36" />
			<col class="break-word" />
		</colgroup>
		<tbody>
			{#each subjectData as data}
				{#if data.value}
					<tr class="h-cell">
						<td
							class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6"
						>
							<p>{data.tag}</p>
						</td>
						<td class="border-zinc-600/60 border">
							<p class="right-col flex items-center px-6">{data.value}</p>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
{:else}
	<table class="text-lg border-hidden w-full">
		<thead class="h-10">
			<th colspan="2" class="bg-zinc-700 rounded-t-md"
				>Welk cijfer moet ik halen? ({$selectedSubject?.subject.abbreviation})</th
			>
		</thead>
		<colgroup>
			<col class="w-36" />
			<col class="break-word" />
		</colgroup>
		<tbody
			><tr class="h-cell">
				<td class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6">
					<p>Cijfertype</p>
				</td>
				<td class="border-zinc-600/60 border">
					<GradeTypeSelector {gradeTypes} />
				</td>
			</tr>
			{#each calcData as data}
				{#if data.weight}
					<tr class="h-cell">
						<td
							class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6"
						>
							<p>{data.tag}</p>
						</td>
						<td class="border-zinc-600/60 border">
							<p class="right-col flex items-center px-6">{data.score} ({data.weight})</p>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
{/if}

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
