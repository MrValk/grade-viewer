<script lang="ts">
	import getSubjects from '$utils/getSubjectsFromGrades';
	import type { SubjectGrades } from '$models/subjectGrades';
	import type { Grade } from '$models/grade';

	import calcAverage from '$utils/calcAverage';

	import {
		subjectGrades,
		setSubjectGrades,
		mostGrades,
		setMostGrades
	} from '$stores/subjectGrades';

	export let grades: Grade[];

	let subjectCount = 0;

	$: {
		if (grades) console.log('GradesTable.svelte: ', grades);
		subjectCount = $subjectGrades.length;
	}

	if ($subjectGrades.length === 0 || $mostGrades === 0) {
		const subjects = getSubjects(grades).sort();
		let subjectGradesArr: SubjectGrades[] = [];

		subjects.forEach((subject) => {
			const subjectGrades = grades.filter((grade) => grade.subject.abbreviation === subject);
			subjectGradesArr = [...subjectGradesArr, { subject, grades: subjectGrades }];
		});

		setMostGrades(
			Math.max(...subjectGradesArr.map((subjectGrades) => subjectGrades.grades.length))
		);

		setSubjectGrades(subjectGradesArr);
	}
</script>

<table class="text-lg border-hidden rounded-md shadow-zinc-900 shadow-xl bg-zinc-500/70">
	<thead class="h-10">
		<th class="bg-zinc-700 rounded-tl-md">Vak</th>
		<th class="bg-zinc-700" colspan={$mostGrades}>Cijfers & Wegingen</th>
		<th class="bg-zinc-700 rounded-tr-md">PTA</th>
	</thead>
	<colgroup>
		<col class="w-48" />
		{#each Array($mostGrades) as _}
			<col class="w-cell" />
		{/each}
		<col class="w-2cell" />
	</colgroup>
	<tbody>
		{#each $subjectGrades as subjectGrades, i}
			<tr class={`h-cell ${subjectCount === i + 1 ? 'last-grade-row' : ''}`}>
				<td class="bg-zinc-600"><h4 class="pl-6">{subjectGrades.subject}</h4></td>
				{#each Array($mostGrades) as _, i}
					{#if subjectGrades.grades[i]}
						<td class="p-0 border-zinc-600/60 border"
							><p class="flex justify-center items-center">
								{subjectGrades.grades[i].score.toLocaleString()}
							</p>
							<p class="flex justify-center items-center text-sm text-zinc-400">
								{subjectGrades.grades[i].weight.toLocaleString()}
							</p>
						</td>
					{:else}
						<td class="w-cell h-cell border-zinc-600/60 border" />
					{/if}
				{/each}
				<td class="p-0 w-2cell h-cell border-zinc-600/60 border-t"
					><p class="flex justify-center items-center">
						{calcAverage(subjectGrades.grades).toLocaleString()}
					</p>
					<p class="flex justify-center items-center text-sm text-zinc-400">
						{subjectGrades.grades.reduce((acc, grade) => acc + grade.weight, 0).toLocaleString()}
					</p>
				</td></tr
			>
		{/each}
	</tbody>
</table>

<style lang="scss">
	$cellWidth: 4rem;

	.w-cell {
		width: $cellWidth;
	}

	.w-2cell {
		width: calc(2 * $cellWidth);
	}

	.h-cell {
		height: $cellWidth;
	}

	.last-grade-row td:first-child {
		border-bottom-left-radius: 0.375rem;
	}

	.last-grade-row td:last-child {
		border-bottom-right-radius: 0.375rem;
	}
</style>
