<script lang="ts">
	import type { LayoutServerData } from './$types';
	import getSubjects from '$utils/getSubjectsFromGrades';
	import type { SubjectGrades } from '$src/lib/models/subjectGrades';

	import {
		subjectGrades,
		setSubjectGrades,
		mostGrades,
		setMostGrades
	} from '$stores/subjectGrades';

	export let data: LayoutServerData;

	let subjectCount = 0;

	$: {
		subjectCount = $subjectGrades.length;
	}

	if ($subjectGrades.length === 0 || $mostGrades === 0) {
		const subjects = getSubjects(data.grades);
		let subjectGradesArr: SubjectGrades[] = [];

		subjects.forEach((subject) => {
			const subjectGrades = data.grades.filter((grade) => grade.subject.abbreviation === subject);
			subjectGradesArr = [...subjectGradesArr, { subject, grades: subjectGrades }];
		});

		setMostGrades(
			Math.max(...subjectGradesArr.map((subjectGrades) => subjectGrades.grades.length))
		);

		setSubjectGrades(subjectGradesArr);
	}
</script>

<h3 class="text-2xl font-semibold mb-6 text-white">{data.schoolYears[0].study.name}</h3>
<table class="text-lg border-hidden rounded-md">
	<thead class="h-10">
		<th class="bg-white/90 rounded-tl-md">Vak</th>
		<th class="bg-white/90 rounded-tr-md" colspan={$mostGrades}>Cijfers</th>
	</thead>
	<colgroup>
		<col class="w-48" />
		{#each Array($mostGrades) as _}
			<col class="w-cell" />
		{/each}
	</colgroup>
	<tbody>
		{#each $subjectGrades as subjectGrades, i}
			<tr class={`h-cell ${i === subjectCount - 1 ? 'last-grade-row' : ''}`}>
				<td class={`bg-gray-300 ${i === subjectCount - 1 ? 'rounded-bl-md' : ''}`}
					><h4 class="pl-6">{subjectGrades.subject}</h4></td
				>
				{#each Array($mostGrades) as _, i}
					{#if subjectGrades.grades[i]}
						<td class="p-0 border-gray-200 border bg-white/80"
							><p class="flex justify-center items-center">
								{subjectGrades.grades[i].score.toLocaleString()}
							</p></td
						>
					{:else}
						<td class="w-cell h-cell border-gray-200 border bg-white/80" />
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	$cellWidth: 4rem;

	.w-cell {
		width: $cellWidth;
	}

	.h-cell {
		height: $cellWidth;
	}

	.last-grade-row td:last-child {
		border-bottom-right-radius: 0.375rem;
	}
</style>
