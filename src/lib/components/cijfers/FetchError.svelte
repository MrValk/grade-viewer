<script lang="ts">
	export let schoolYearName: string;
	export let retry: () => Promise<void>;

	let countDown = 15;

	const countDownInterval = setInterval(() => {
		if (countDown === 1) clearInterval(countDownInterval);

		countDown--;
	}, 1000);
</script>

<article
	class="flex flex-col items-center justify-center gap-6 text-lg rounded-md shadow-zinc-900 shadow-xl bg-zinc-500/70"
>
	<h4 class="text-center text-3xl">
		Er is een fout opgetreden bij het ophalen van de cijfers voor {schoolYearName}.
	</h4>
	<p class="text-xl">Probeer het opnieuw in: {countDown} seconden.</p>
	<button
		class={`p-3 rounded-md ${
			!!countDown ? 'bg-zinc-700/50 text-white/50 cursor-not-allowed' : 'bg-zinc-800/60'
		}`}
		disabled={!!countDown}
		on:click={retry}>Opnieuw proberen</button
	>
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	article {
		height: calc(2.5rem + 10 * $cellWidth);
		width: calc(12rem + 15 * $cellWidth);
	}
</style>
