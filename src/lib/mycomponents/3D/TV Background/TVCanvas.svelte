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
			tvPosition.set([position.x / 10, position.y / 10, position.z / 10]);
			tvRotation.set([
				rotation.x * (Math.PI / 180),
				rotation.y * (Math.PI / 180),
				rotation.z * (Math.PI / 180)
			]);
			tvScale.set([scale.x / 10, scale.y / 10, scale.z / 10]);
		}
	}}
/>

<div class="fixed flex h-full w-full justify-center">
	<Canvas>
		<TvScene />
	</Canvas>
</div>
