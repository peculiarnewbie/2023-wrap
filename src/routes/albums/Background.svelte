<script lang="ts">
	import "../../app.css";
	import { Canvas } from "@threlte/core";
	import { Theatre, Project, Studio, Sheet, Sequence } from "@threlte/theatre";

	import Scene from "./Scene.svelte";

	import * as config from "./2023BG.theatre-project-state.json";
	import { onMount } from "svelte";

	let sheet: Sheet;
	let canvas: Canvas;
	let project: Project;

	onMount(() => {
		console.log(canvas, project, sheet);
	});
</script>

<div class=" fixed z-10 h-screen w-screen">
	<Canvas bind:this={canvas}>
		<Studio enabled={false}>
			<Project bind:this={project} config={{ state: config }} name="2023BG">
				<Sheet bind:this={sheet} name="default">
					<Scene />
				</Sheet>
			</Project>
		</Studio>
	</Canvas>
</div>
