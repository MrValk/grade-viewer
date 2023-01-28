<script lang="ts">
	export let schoolYearName: string;
</script>

<article
	class="flex flex-col items-center justify-center gap-6 text-lg rounded-md shadow-zinc-900 shadow-xl bg-zinc-500/70"
>
	<h4 class="text-center text-3xl">
		Cijfers voor {schoolYearName} worden opgehaald...
	</h4>
	<p class="text-xl">Even wachten alstublieft.</p>
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	article {
		height: calc(2.5rem + 10 * $cellWidth);
		width: calc(12rem + 15 * $cellWidth);
	}
</style>
