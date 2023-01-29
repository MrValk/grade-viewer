<script lang="ts">
	import '../app.css';
	import Header from '$components/main/Header.svelte';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<link rel="stylesheet" href="/styles/satoshi.css" />
</svelte:head>
<div class="flex flex-col items-center w-full h-full min-h-screen bg-zinc-800 text-white">
	<Header photo={data.photo} name={data.name} />
	<main class="w-11/12 py-6">
		<slot />
	</main>
</div>
