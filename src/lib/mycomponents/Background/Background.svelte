<script lang="ts">
	import "../../../app.css";
	import { Canvas } from "@threlte/core";
	import { Theatre, Project, Studio, Sheet, Sequence } from "@threlte/theatre";

	import Scene from "./Scene.svelte";

	import { onMount } from "svelte";
	let canvas: Canvas;

	onMount(() => {
		console.log(canvas);
	});
</script>

<Theatre studio={{ enabled: true }}>
	<div class=" fixed z-10 h-screen w-screen">
		<Canvas bind:this={canvas}>
			<Scene />
		</Canvas>
	</div>
</Theatre>
