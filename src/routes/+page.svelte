<script lang="ts">
	import "../app.css";
	import Player from "$lib/Player.svelte";
</script>

<div class="flex flex-col text-slate-200">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<div class="flex h-[720px] w-[1200px]">
		<Player></Player>
	</div>
</div>
