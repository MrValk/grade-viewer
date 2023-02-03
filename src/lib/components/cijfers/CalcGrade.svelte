<script lang="ts">
	import GradeTypeSelector from '$components/cijfers/GradeTypeSelector.svelte';

	import { selectedSubject } from '$stores/selectedSubject';
	import { selectedGradeType } from '$stores/selectedGradeType';

	import { getGradeTypes } from '$utils/getGradeTypes';
	import { calcNeededGrade } from '$utils/calcWantedGrade';

	let wantedGrade: number | null = null;
	let weight: number | null = null;
	let neededGrade: number | null = null;

	let validWantedGrade: boolean | string = false;
	let validWeight: boolean | string = false;

	let gradeTypes: string[] = [];
	$: if ($selectedSubject) {
		gradeTypes = getGradeTypes($selectedSubject.grades);
		reset();
	}

	$: if ($selectedGradeType) {
		reset();
	}

	$: calcData = [
		{
			tag: 'PTA',
			score: gradeTypes.includes('PTA')
				? $selectedSubject?.PTA?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  })
				: null,
			weight: $selectedSubject?.PTA?.weight.toLocaleString()
		},
		{
			tag: 'OV',
			score: gradeTypes.includes('OV')
				? $selectedSubject?.OV?.grade.toLocaleString(undefined, {
						maximumFractionDigits: 1,
						minimumFractionDigits: 1
				  })
				: null,
			weight: $selectedSubject?.OV?.weight.toLocaleString()
		}
	];

	function validateWantedGrade() {
		if (!wantedGrade) return;

		validWantedGrade =
			wantedGrade < 1 || wantedGrade > 10 ? 'Cijfer moet tussen 1 en 10 liggen.' : true;
	}

	function validateWeight() {
		if (!weight) return;

		validWeight = weight < 1 || weight > 100 ? 'Weging moet tussen 1 en 100 liggen.' : true;
	}

	function calc() {
		if (!wantedGrade || !weight) return;

		const currentGrade = calcData.find((data) => data.tag === $selectedGradeType);
		if (!currentGrade) return;

		const currentGradeScore = calcData.find((data) => data.tag === $selectedGradeType)?.score;
		const currentGradeWeight = calcData.find((data) => data.tag === $selectedGradeType)?.weight;
		if (!currentGradeScore || !currentGradeWeight) return;

		neededGrade = calcNeededGrade(
			parseFloat(currentGradeScore.replace(',', '.')),
			parseFloat(currentGradeWeight.replace(',', '.')),
			wantedGrade,
			weight
		);
	}

	function reset() {
		wantedGrade = weight = neededGrade = null;
		validWantedGrade = validWeight = false;
	}
</script>

<form>
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
				{#if data.score && data.tag === $selectedGradeType}
					<tr class="h-cell">
						<td
							class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6"
						>
							<p>{data.tag} (Huidig)</p>
						</td>
						<td class="border-zinc-600/60 border">
							<p class="right-col flex items-center px-6">{data.score} ({data.weight})</p>
						</td>
					</tr>
				{/if}
			{/each}
			<tr class="h-cell">
				<td class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6">
					<p>Gewenst</p>
				</td>
				<td class="border-zinc-600/60 border">
					<div class="flex items-center">
						<input
							type="number"
							step="0.1"
							placeholder="6,0"
							bind:value={wantedGrade}
							on:input={() => {
								validateWantedGrade();
								if (validWantedGrade === true && validWeight === true) calc();
							}}
							class="right-col flex items-center w-2cell mx-3 h-fit bg-zinc-600 outline-none rounded-md px-3 py-1"
						/>
						{#if typeof validWantedGrade === 'string'}
							<p class="text-red-500 mx-3 text-sm">{validWantedGrade}</p>
						{/if}
					</div>
				</td>
			</tr>
			<tr class="h-cell">
				<td class="p-0 h-cell bg-zinc-600/50 border-zinc-600/60 border-t flex items-center pl-6">
					<p>Weging</p>
				</td>
				<td class="border-zinc-600/60 border">
					<div class="flex items-center">
						<input
							type="number"
							step="0.1"
							placeholder="15"
							bind:value={weight}
							on:input={() => {
								validateWeight();
								if (validWantedGrade === true && validWeight === true) calc();
							}}
							class="right-col flex items-center w-2cell mx-3 bg-zinc-600 outline-none rounded-md px-3 py-1"
						/>
						{#if typeof validWeight === 'string'}
							<p class="text-red-500 mx-3 text-sm">{validWeight}</p>
						{/if}
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="flex items-center justify-center bg-zinc-600 px-6 h-cell w-full">
		{#if validWantedGrade === true && validWeight === true && neededGrade && wantedGrade && weight}
			Voor een {wantedGrade.toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})} moet je een {neededGrade.toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})} (weging {weight.toLocaleString()}) halen
		{:else}
			Voer een gewenst gemiddelde en gewicht in
		{/if}
	</p>
</form>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	::-webkit-inner-spin-button,
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
