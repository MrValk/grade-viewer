<script lang="ts">
	import { selectedGrade } from '$stores/selectedGrade';

	import { formatDate } from '$utils/formatDate';

	let infoWidth: number = 0;
	let infoEl: HTMLElement;

	let observer = new ResizeObserver(() => {
		if (infoEl) infoWidth = infoEl.offsetWidth;
	});

	$: {
		observer.disconnect();
		if (infoEl) observer.observe(infoEl);
	}

	function load(node: HTMLElement) {
		node.style.width = `${infoWidth}px`;
		node.style.maxWidth = `${infoWidth}px`;
	}
</script>

<article class="text-lg h-full bg-zinc-500/70 rounded-md overflow-hidden shadow-xl">
	<h3 class="flex items-center justify-center bg-zinc-700 font-bold h-10">Cijferinfo</h3>
	{#if $selectedGrade}
		<section use:load>
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
		</section>
	{:else}
		<div class="w-full h-full flex items-center justify-center" bind:this={infoEl}>
			<h4 class="text-2xl text-center">Klik op een cijfer voor meer informatie</h4>
		</div>
	{/if}
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.min-w-36 {
		min-width: 9rem;
	}
</style>
