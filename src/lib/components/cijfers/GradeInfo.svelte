<script lang="ts">
	import { selectedGrade } from '$stores/selectedGrade';

	import { formatDate } from '$utils/formatDate';
</script>

<article class="text-lg flex-grow bg-zinc-500/70 w-full rounded-md overflow-hidden shadow-xl">
	<h3 class="flex items-center justify-center bg-zinc-700 font-bold h-10">Cijferinfo</h3>
	{#if $selectedGrade}
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Naam</p>
			<p class="flex items-center px-6">{$selectedGrade.name}</p>
		</div>
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Vak</p>
			<p class="flex items-center px-6">
				{$selectedGrade.subject.abbreviation} ({$selectedGrade.subject.name})
			</p>
		</div>
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Beschrijving</p>
			<p class="flex items-center px-6">
				{$selectedGrade.description}
			</p>
		</div>
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Type</p>
			<p class="flex items-center px-6">{$selectedGrade.type}</p>
		</div>
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Score</p>
			<p class="flex items-center px-6">
				{$selectedGrade.score.toLocaleString(undefined, {
					maximumFractionDigits: 1,
					minimumFractionDigits: 1
				})}
			</p>
		</div>
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Gewicht</p>
			<p class="flex items-center px-6">{$selectedGrade.weight}</p>
		</div>
		{#if $selectedGrade.teacher.name}
			<div class="flex h-cell border-zinc-600/60 border-t">
				<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Docent</p>
				<p class="flex items-center px-6">{$selectedGrade.teacher.name}</p>
			</div>
		{/if}
		<div class="flex h-cell border-zinc-600/60 border-t">
			<p class="bg-zinc-600/50 min-w-36 w-36 flex items-center pl-6">Datum</p>
			<p class="flex items-center px-6">{formatDate(new Date($selectedGrade.date))}</p>
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center">
			<h4 class="text-2xl">Klik op een cijfer voor meer informatie</h4>
		</div>
	{/if}
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.min-w-36 {
		min-width: 9rem;
	}
</style>
