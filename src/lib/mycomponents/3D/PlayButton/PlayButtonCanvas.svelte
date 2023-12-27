<script lang="ts">
	import "../../../../app.css";
	import { Canvas } from "@threlte/core";
	import { Theatre, Project, Studio, Sheet, Sequence } from "@threlte/theatre";
	import { createEventDispatcher } from "svelte";
	import Scene from "./Scene.svelte";

	import state from "./state.json";

	import { onMount } from "svelte";

	export let studio: boolean;
	const dispatch = createEventDispatcher();

	let canvas: Canvas;

	let isStarted = false;

	const handleStart = async () => {
		isStarted = true;
		await new Promise(() => {
			setTimeout(sendEvent, 200);
		});
	};

	const sendEvent = () => {
		dispatch("start");
	};

	onMount(() => {
		console.log(canvas);
	});
</script>

<div class={` ${isStarted ? "pointer-events-none" : ""}`}>
	<Theatre config={{ state: state }} studio={{ enabled: studio }}>
		<div class={` fixed z-40 h-screen w-screen`}>
			<Canvas bind:this={canvas}>
				<Scene on:start={handleStart} />
			</Canvas>
		</div>
	</Theatre>
</div>
