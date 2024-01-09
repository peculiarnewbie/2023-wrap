<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import "../app.css";

	onMount(() => {
		goto("/albums");
	});
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="text-2xl text-slate-200">redirecting...</div>
</div>
