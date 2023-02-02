<script lang="ts">
	import { selectedSubject } from '$stores/selectedSubject';
	import { calcGrade, setCalcGrade } from '$stores/calcGrade';

	import Fa from 'svelte-fa';
	import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-grow bg-zinc-500/70 rounded-md overflow-hidden h-cell shadow-xl">
	<h3 class="flex items-center justify-center bg-zinc-700 font-bold h-cell w-1/2">
		Welk cijfer moet ik halen?
	</h3>
	{#if !$selectedSubject}
		<p class="flex items-center justify-center flex-grow bg-zinc-600/50">Klik op een vak</p>
	{:else}
		<button
			class={`flex items-center justify-center flex-grow bg-zinc-600/50 gap-3 hover:text-gray-300 transition ${
				$calcGrade ? 'font-bold' : ''
			}`}
			on:click={() => setCalcGrade(!$calcGrade)}
		>
			<p>
				Berekenen voor: {$selectedSubject.subject.abbreviation}
			</p>
			<Fa icon={faChevronUp} class="text-lg" />
		</button>
	{/if}
</div>

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
