<script lang="ts">
	import "../../../app.css";
	import { Canvas } from "@threlte/core";
	import { Theatre, Project, Studio, Sheet, Sequence } from "@threlte/theatre";
	import Scene from "./Scene.svelte";

	import state from "./state.json";

	import { onMount } from "svelte";

	export let studio: boolean;

	let canvas: Canvas;

	onMount(() => {
		console.log(canvas);
	});
</script>

<div class="">
	<Theatre config={{ state: state }} studio={{ enabled: studio }}>
		<div class=" fixed z-40 h-screen w-screen">
			<Canvas bind:this={canvas}>
				<Scene on:start />
			</Canvas>
		</div>
	</Theatre>
</div>
