<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

	import { schoolYearIndex, setSchoolYearIndex } from '$stores/schoolYearIndex';
	import { fetchedGrades } from '$stores/fetchedGrades';
	import type { SchoolYear } from '$models/schoolYear';
	import { onMount } from 'svelte';

	export let schoolYears: SchoolYear[];
	export let fetching: boolean;

	let showMenu: boolean = false;

	onMount(() => {
		document.onclick = () => {
			showMenu = false;
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="flex items-center w-fit mb-6 gap-6" on:click|stopPropagation>
	<button
		disabled={fetching}
		class={`flex items-center gap-3 ${
			fetching ? 'cursor-not-allowed text-white/50' : 'cursor-pointer hover:text-gray-300'
		} transition`}
		on:click={() => (showMenu = !showMenu)}
	>
		<h3 class="text-2xl font-semibold">{schoolYears[$schoolYearIndex].study.name}</h3>
		<Fa icon={faChevronRight} class="text-xl" />
	</button>
	<ul class={`flex items-center gap-6 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
		{#each schoolYears as schoolYear, i}
			<li
				class={`relative text-md font-semibold ${
					$fetchedGrades.findIndex((fetched) => fetched.schoolYearIndex === i) === -1
						? 'text-white/50'
						: 'hover:text-gray-300'
				} transition`}
			>
				<button
					class={showMenu ? 'cursor-pointer' : 'cursor-default'}
					disabled={fetching || !showMenu || i === $schoolYearIndex}
					on:click={() => {
						setSchoolYearIndex(i);
						showMenu = false;
					}}>{schoolYear.study.name}</button
				>
				<span
					class={`absolute bottom-0 left-0 rounded-full ${
						i === $schoolYearIndex ? 'w-full' : 'w-0'
					} ${
						$fetchedGrades.findIndex((fetched) => fetched.schoolYearIndex === i) === -1
							? '!bg-white/50'
							: 'bg-white'
					}`}
				/>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
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
