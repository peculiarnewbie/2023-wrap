<script lang="ts">
	import { Theatre } from "@threlte/theatre";
	import { Canvas } from "@threlte/core";
	import TvScene from "./TVScene.svelte";

	import { tvPosition, tvRotation, tvScale } from "$lib/stores";
	import { createSheetObjectAction } from "@threlte/theatre";

	const tvSheetObject = createSheetObjectAction();
</script>

<div
	class=" hidden"
	use:tvSheetObject={{
		key: "TV",
		props: {
			position: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 }
		},
		callback: (node, { position, rotation, scale }) => {
			tvPosition.set([position.x, position.y, position.z]);
			tvRotation.set([
				rotation.x * (Math.PI / 180),
				rotation.y * (Math.PI / 180),
				rotation.z * (Math.PI / 180)
			]);
			tvScale.set([scale.x, scale.y, scale.z]);
		}
	}}
/>

<div class={` fixed z-40 h-screen w-screen`}>
	<Canvas>
		<TvScene />
	</Canvas>
</div>
