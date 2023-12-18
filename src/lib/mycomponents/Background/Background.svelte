<script lang="ts">
	import "../../../app.css";
	import { Canvas } from "@threlte/core";
	import { Theatre, Project, Studio, Sheet, Sequence } from "@threlte/theatre";
	import Scene from "./Scene.svelte";

	import state from "./state.json";

	import { onMount } from "svelte";
	let canvas: Canvas;

	onMount(() => {
		console.log(canvas);
	});
</script>

<div class="pointer-events-none">
	<Theatre config={{ state: state }} studio={{ enabled: false }}>
		<div class=" fixed z-40 h-screen w-screen">
			<Canvas bind:this={canvas}>
				<Scene />
			</Canvas>
		</div>
	</Theatre>
</div>
