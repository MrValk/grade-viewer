<script lang="ts">
	import Header from '$components/login/Header.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<link rel="stylesheet" href="../styles/satoshi.css" />
</svelte:head>

<div class="flex justify-center items-center w-full h-screen bg-zinc-800 text-white">
	<main class="flex flex-col items-center w-1/2 gap-12">
		<Header />
		<span class="bg-gray-600 w-full" />
		<article class="flex flex-col gap-6 w-1/2 bg-zinc-700/50 shadow-xl p-6 rounded-md">
			<h2 class="text-4xl text-center">Inloggen</h2>
			<form class="flex flex-col gap-6" method="POST">
				<div class="flex flex-col gap-3">
					<label class="text-xl" for="username">Gebruikersnaam</label>
					<input
						class="flex items-center text-xl w-full h-10 bg-zinc-600 outline-none rounded-md px-3 py-1"
						type="text"
						name="username"
						id="username"
						placeholder="Leerlingnummer"
						required
						minlength="6"
						maxlength="6"
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label class="text-xl" for="password">Wachtwoord</label>
					<input
						class="flex items-center text-xl w-full h-10 bg-zinc-600 outline-none rounded-md px-3 py-1"
						type="password"
						name="password"
						id="password"
						placeholder="**********"
						required
						minlength="1"
						maxlength="63"
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label class="text-xl" for="school">School</label>
					<input
						class="flex items-center text-xl w-full h-10 bg-zinc-600 outline-none rounded-md px-3 py-1"
						type="text"
						name="school"
						id="school"
						placeholder="pantarijn"
						required
						minlength="1"
						maxlength="63"
					/>
				</div>
				<div>
					<button
						class="flex items-center text-xl w-full h-10 bg-zinc-700 outline-none rounded-md px-3 py-1"
						type="submit">Inloggen</button
					>
				</div>
			</form>
			<div>
				<p>{form?.message}</p>
			</div>
		</article>
	</main>
</div>

<style>
	span {
		height: 1px;
	}
</style>
