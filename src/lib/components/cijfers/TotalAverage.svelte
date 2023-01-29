<script lang="ts">
	import { subjectsGrades } from '$stores/subjectsGrades';
	import { gradeTypes } from '$stores/gradeTypes';
	import { getTotalPTA } from '$utils/getTotalPTA';
	import { getTotalOV } from '$utils/getTotalOV';
</script>

<section class="flex text-lg bg-zinc-500/70 shadow-xl rounded-md overflow-hidden w-fit">
	<h5 class="flex items-center justify-center w-2cell h-cell font-bold bg-zinc-700">Totaal</h5>
	{#if $gradeTypes.includes('PTA')}
		<p
			class="flex items-center justify-center w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-l"
		>
			{getTotalPTA($subjectsGrades).toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})}
		</p>
	{/if}
	{#if $gradeTypes.includes('OV')}
		<p
			class="flex items-center justify-center w-2cell h-cell bg-zinc-600/50 border-zinc-600/60 border-l"
		>
			{getTotalOV($subjectsGrades).toLocaleString(undefined, {
				maximumFractionDigits: 1,
				minimumFractionDigits: 1
			})}
		</p>{/if}
</section>

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
