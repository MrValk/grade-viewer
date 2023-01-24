<script>
	import '../app.css';
</script>

<nav>
	<a href="/">Home</a>
	<a href="/b">b</a>
</nav>

<header class="w-full h-16 flex items-center pl-12 bg-blue-400">
	<h1 class="text-white text-4xl font-semibold">Cijfers</h1>
</header>
<main class="p-12 -mt-6">
	<slot />
</main>
