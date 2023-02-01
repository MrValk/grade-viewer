<script lang="ts">
	import { subjectsGrades } from '$stores/subjectsGrades';
	import { gradeTypes } from '$stores/gradeTypes';
	import { getSpecialTitle } from '$utils/getSpecialTitle';
</script>

<div class="flex flex-grow bg-zinc-500/70 rounded-md overflow-hidden shadow-xl">
	<h3 class="flex items-center justify-center bg-zinc-700 font-bold h-cell w-48">Speciale Titel</h3>
	<p class="flex items-center justify-center flex-grow bg-zinc-600/50">
		{getSpecialTitle($subjectsGrades, $gradeTypes) || 'Geen speciale titel'}
	</p>
</div>

<style lang="scss">
	@use 'src/_vars.scss' as *;
</style>
