<script lang="ts">
	import { selectedGrade } from '$stores/selectedGrade';

	import { formatDate } from '$utils/formatDate';
	import { onMount } from 'svelte';

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
			value: $selectedGrade?.weight.toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})
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

	let infoWidth: number = 0;
	let infoEl: HTMLElement;

	let observer: ResizeObserver;

	onMount(() => {
		observer = new ResizeObserver(() => {
			if (infoEl) infoWidth = infoEl.offsetWidth;
		});
	});

	$: {
		if (observer) {
			observer.disconnect();
			if (infoEl) observer.observe(infoEl);
		}
	}

	function showInfo(node: HTMLElement) {
		node.style.width = `${infoWidth}px`;
		node.style.maxWidth = `${infoWidth}px`;

		const rightCols = node.querySelectorAll('.right-col');
		if (rightCols.length && infoWidth) {
			// Convert rem to px, using the root font size
			const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
			rightCols.forEach((col) => {
				const rightCol = col as HTMLElement;
				rightCol.style.width = `${infoWidth - rem * 9}px`;
				rightCol.style.maxWidth = `${infoWidth - rem * 9}px`;
			});
		}
	}
</script>

<article class="text-lg h-full bg-zinc-500/70 rounded-md overflow-hidden shadow-xl">
	{#if $selectedGrade}
		<table class="text-lg border-hidden w-full" use:showInfo>
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
	{:else}
		<div class="w-full h-full flex items-center justify-center" bind:this={infoEl}>
			<h4 class="text-xl text-center font-semibold">Klik op een cijfer voor meer informatie</h4>
		</div>
	{/if}
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.min-w-36 {
		min-width: 9rem;
	}
</style>
