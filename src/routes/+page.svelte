<script lang="ts">
	import type { PageServerData } from './$types';
	import getSubjects from '$utils/getSubjectsFromGrades';
	import type { SubjectGrades } from '$src/lib/models/subjectGrades';

	export let data: PageServerData;

	const subjects = getSubjects(data.grades);
	let subjectGradesArr: SubjectGrades[] = [];

	subjects.forEach((subject) => {
		const subjectGrades = data.grades.filter((grade) => grade.subject.abbreviation === subject);
		subjectGradesArr = [...subjectGradesArr, { subject, grades: subjectGrades }];
	});

	const mostGrades = Math.max(
		...subjectGradesArr.map((subjectGrades) => subjectGrades.grades.length)
	);
</script>

<h3 class="text-2xl font-semibold mb-6">{data.schoolYears[0].study.name}</h3>
<table class="table-fixed border-collapse text-lg">
	<thead class="bg-gray-300 h-10">
		<th>Vak</th>
		<th colspan={mostGrades}>Cijfers</th>
	</thead>
	<colgroup>
		<col class="w-48 bg-gray-200" />
		{#each Array(mostGrades) as _}
			<col class="w-cell" />
		{/each}
	</colgroup>
	<tbody>
		{#each subjectGradesArr as subjectGrades}
			<tr class="h-cell">
				<td><h4 class="pl-6">{subjectGrades.subject}</h4></td>
				{#each Array(mostGrades) as _, i}
					{#if subjectGrades.grades[i]}
						<td class="p-0 border border-gray-200"
							><p class="flex justify-center items-center">
								{subjectGrades.grades[i].score.toLocaleString()}
							</p></td
						>
					{:else}
						<td class="w-cell h-cell border border-gray-200" />
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	$cellWidth: 4.5rem;

	.w-cell {
		width: $cellWidth;
	}

	.h-cell {
		height: $cellWidth;
	}
</style>
