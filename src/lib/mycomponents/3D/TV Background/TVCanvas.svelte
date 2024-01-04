<script lang="ts">
	import { Theatre } from "@threlte/theatre";
	import { Canvas } from "@threlte/core";
	import TvScene from "./TVScene.svelte";

	import { tvPosition, tvRotation, tvScale } from "$lib/stores";
	import { createSheetObjectAction } from "@threlte/theatre";
	import { onMount } from "svelte";
	import { tvCamera } from "$lib/stores";

	const tvSheetObject = createSheetObjectAction();
	let resizeTimeout;

	const resizeVideo = () => {
		if (window.innerWidth > 640) {
			tvCamera.set({ position: { x: 0, y: -1, z: 5 }, lookAt: { x: 0, y: 0 } });
		} else {
			tvCamera.set({ position: { x: 0, y: -1, z: 7 }, lookAt: { x: 0, y: 1.6 } });
		}
	};

	const handleResize = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			resizeVideo();
		}, 500);
	};

	onMount(() => {
		resizeVideo();
	});
</script>

<svelte:window on:resize={handleResize} />

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

<div class={` fixed z-40 h-screen w-screen`}>
	<Canvas>
		<TvScene />
	</Canvas>
</div>
