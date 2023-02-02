<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

	import { selectedGradeType, setSelectedGradeType } from '$stores/selectedGradeType';
	import { onMount } from 'svelte';

	export let gradeTypes: string[];

	setSelectedGradeType(gradeTypes[0]);

	let showMenu: boolean = false;

	onMount(() => {
		document.onclick = () => {
			showMenu = false;
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="flex items-center justify-center w-fit px-6 gap-6" on:click|stopPropagation>
	{#if gradeTypes.length > 1}
		<button
			class="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
			on:click={() => (showMenu = !showMenu)}
		>
			<h3 class="text-lg font-semibold">{$selectedGradeType}</h3>
			<Fa icon={faChevronRight} class="text-xl" />
		</button>
		<ul class={`flex items-center gap-6 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
			{#each gradeTypes as gradeType}
				<li class="relative text-lg font-semibold hover:text-gray-300 transition">
					<button
						class={showMenu ? 'cursor-pointer' : 'cursor-default'}
						disabled={!showMenu || gradeType === $selectedGradeType}
						on:click={() => {
							setSelectedGradeType(gradeType);
							showMenu = false;
						}}>{gradeType}</button
					>
					<span
						class={`absolute bottom-0 left-0 rounded-full ${
							gradeType === $selectedGradeType ? 'w-full' : 'w-0'
						} bg-white`}
					/>
				</li>
			{/each}
		</ul>
	{:else}<h3 class="text-lg font-semibold">{$selectedGradeType}</h3>
	{/if}
</section>

<style lang="scss">
	@use 'src/_vars.scss' as *;

	ul {
		transition: opacity 150ms ease-in-out;

		li {
			&:hover span {
				width: 100%;
				background-color: rgb(209 213 219); //bg-gray-300
			}

			span {
				height: 2px;

				transition: width 150ms ease-in-out;
			}
		}
	}
</style>
