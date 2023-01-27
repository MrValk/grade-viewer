<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

	import { schoolYearIndex, setSchoolYearIndex } from '$src/lib/stores/schoolYearIndex';
	import type { SchoolYear } from '$models/schoolYear';
	import { onMount } from 'svelte';

	export let schoolYears: SchoolYear[];

	let showMenu: boolean = false;

	onMount(() => {
		document.onclick = () => {
			showMenu = false;
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="flex items-center w-fit mb-6 gap-6" on:click|stopPropagation>
	<button class="flex items-center gap-3" on:click={() => (showMenu = !showMenu)}>
		<h3 class="text-2xl font-semibold">{schoolYears[$schoolYearIndex].study.name}</h3>
		<Fa icon={faChevronRight} class="text-xl" />
	</button>
	<ul class={`flex items-center gap-6 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
		{#each schoolYears as schoolYear, i}
			{#if i !== $schoolYearIndex}
				<li class="relative text-md font-semibold">
					<button
						class={showMenu ? 'cursor-pointer' : 'cursor-default'}
						on:click={() => {
							if (!showMenu) return;
							setSchoolYearIndex(i);
							showMenu = false;
						}}>{schoolYear.study.name}</button
					>
					<span class="absolute bottom-0 left-0 w-0 rounded-full bg-white" />
				</li>
			{/if}
		{/each}
	</ul>
</section>

<style lang="scss">
	ul {
		transition: opacity 150ms ease-in-out;

		li {
			&:hover span {
				width: 100%;
				background-color: rgb(209 213 219); // bg-gray-300
			}

			span {
				height: 2px;

				transition: width 150ms ease-in-out;
			}
		}
	}
</style>
