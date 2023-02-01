<script lang="ts">
	import { page } from '$app/stores';

	export let photo: string;
	export let name: string;
</script>

<header class="flex items-center w-11/12 justify-between h-20 border-b border-gray-600">
	<a class="text-4xl w-fit font-bold hover:text-gray-300 transition" href="/"
		><h1>Magister Cijfers</h1></a
	>
	<nav class="flex items-center justify-between gap-12 text-xl">
		<a class="relative flex flex-col hover:text-gray-300 transition" href="/"
			>Cijfers<span
				class={`absolute bottom-0 rounded-full bg-white ${
					$page.route.id === '/' ? 'w-full' : 'w-0'
				}`}
			/></a
		>
		<a class="relative flex flex-col hover:text-gray-300 transition" href="/woordrapporten"
			>Woordrapporten<span
				class={`absolute bottom-0 rounded-full bg-white ${
					$page.route.id === '/woordrapporten' ? 'w-full' : 'w-0'
				}`}
			/></a
		>

		<a href="https://minecraft.net" class="flex items-center gap-6 ml-24">
			<p class="font-semibold whitespace-nowrap">{name}</p>
			<div class="h-12 w-12 rounded-full overflow-hidden">
				<img src={`data:image/jpeg;base64,${photo}`} alt="Account" />
			</div>
		</a>
	</nav>
</header>

<style lang="scss">
	a {
		&:hover span {
			width: 100%;
			background-color: rgb(209 213 219); // bg-gray-300
		}

		span {
			height: 2px;

			transition: width 150ms ease-in-out;
		}
	}
</style>
