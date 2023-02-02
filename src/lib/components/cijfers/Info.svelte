<script lang="ts">
	import { selectedGrade } from '$stores/selectedGrade';
	import { selectedSubject } from '$stores/selectedSubject';

	import { onMount } from 'svelte';

	let infoWidth: number = 0;
	let infoEl: HTMLElement;

	let observer: ResizeObserver;

	onMount(() => {
		observer = new ResizeObserver(() => {
			if (infoEl) infoWidth = infoEl.offsetWidth;
		});

		window.onresize = () => {
			if (infoEl) infoWidth = infoEl.offsetWidth;
		};
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
	{#if $selectedGrade || $selectedSubject}
		<section class="w-full" use:showInfo><slot /></section>
	{:else}
		<div class="h-full flex items-center justify-center" bind:this={infoEl}>
			<h4 class="text-2xl text-center word-break">
				Klik op een cijfer of vak <br /> voor meer informatie
			</h4>
		</div>
	{/if}
</article>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	.min-w-36 {
		min-width: 9rem;
	}
</style>
