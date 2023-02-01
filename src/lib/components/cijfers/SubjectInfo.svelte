<script lang="ts">
	import { selectedSubject } from '$stores/selectedSubject';

	$: subjectData = [
		{
			tag: 'Naam',
			value: `${$selectedSubject?.abbreviation} (${$selectedSubject?.name})`
		},
		{
			tag: 'Docent',
			value: $selectedSubject?.teacher
		}
	];
</script>

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
					<td class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6">
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
</style>
