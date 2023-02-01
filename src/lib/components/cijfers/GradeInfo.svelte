<script lang="ts">
	import { selectedGrade } from '$stores/selectedGrade';

	import { formatDate } from '$utils/formatDate';

	$: gradeData = [
		{
			tag: 'Naam',
			value: $selectedGrade?.name
		},
		{
			tag: 'Vak',
			value: `${$selectedGrade?.subject.abbreviation} (${$selectedGrade?.subject.name})`
		},
		{
			tag: 'Beschrijving',
			value: $selectedGrade?.description
		},
		{
			tag: 'Type',
			value: $selectedGrade?.type
		},
		{
			tag: 'Score',
			value: $selectedGrade?.score.toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})
		},
		{
			tag: 'Weging',
			value: $selectedGrade?.weight.toLocaleString()
		},
		{
			tag: 'Docent',
			value: $selectedGrade?.teacher.name
		},
		{
			tag: 'Datum',
			value: formatDate(new Date($selectedGrade?.date || 0))
		}
	];
</script>

<table class="text-lg border-hidden w-full">
	<thead class="h-10">
		<th colspan="2" class="bg-zinc-700 rounded-t-md">Cijferinfo</th>
	</thead>
	<colgroup>
		<col class="w-36" />
		<col class="break-word" />
	</colgroup>
	<tbody>
		{#each gradeData as data}
			{#if data.value}
				<tr class={data.tag === 'Beschrijving' ? 'h-2cell' : 'h-cell'}>
					<td
						class={`p-0 bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6 ${
							data.tag === 'Beschrijving' ? 'h-2cell' : 'h-cell'
						}`}
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

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.min-w-36 {
		min-width: 9rem;
	}
</style>
