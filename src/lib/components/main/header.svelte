<script lang="ts">
	import { page } from '$app/stores';

	export let photo: string;
	export let name: string;

	$: console.log($page.route.id);
</script>

<header class="flex items-center w-11/12 justify-center h-20 border-b border-gray-600">
	<h1 class="text-white text-4xl w-full font-bold">Magister Clone</h1>
	<nav class="flex items-center justify-between gap-12 text-xl text-white">
		<a
			class={`${
				$page.route.id === '/agenda' ? 'border-b-white' : 'border-transparent'
			} border-b-2 border-t-2 border-t-transparent hover:text-gray-200 hover:border-b-gray-200 transition`}
			href="/agenda">Agenda</a
		>
		<a
			class={`${
				$page.route.id === '/' ? 'border-b-white' : 'border-transparent'
			} border-b-2 border-t-2 border-t-transparent hover:text-gray-200 hover:border-b-gray-200 transition`}
			href="/">Cijfers</a
		>
		<a
			class={`${
				$page.route.id === '/absenties' ? 'border-b-white' : 'border-transparent'
			} border-b-2 border-t-2 border-t-transparent hover:text-gray-200 hover:border-b-gray-200 transition`}
			href="/absenties">Absenties</a
		>
		<a
			class={`${
				$page.route.id === '/berichten' ? 'border-b-white' : 'border-transparent'
			} border-b-2 border-t-2 border-t-transparent hover:text-gray-200 hover:border-b-gray-200 transition`}
			href="/berichten">Berichten</a
		>

		<a href="https://minecraft.net" class="flex items-center gap-6 ml-24">
			<p class="font-semibold whitespace-nowrap">{name}</p>
			<div class="h-12 w-12 rounded-full overflow-hidden">
				<img src={`data:image/jpeg;base64,${photo}`} alt="Account" />
			</div>
		</a>
	</nav>
</header>
