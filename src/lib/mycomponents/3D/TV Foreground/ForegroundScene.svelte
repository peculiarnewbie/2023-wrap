<script lang="ts">
	import { T } from "@threlte/core";
	import Foreground from "./Foreground.svelte";
	import Tv from "../TV Background/TV.svelte";

	import { tvCamera } from "$lib/stores";
	import type { PerspectiveCamera } from "three";
	import { onDestroy, onMount } from "svelte";

	let camera: PerspectiveCamera;

	const unsubscribe = tvCamera.subscribe((value) => {
		if (camera == null) return;
		camera.position.set(value.position.x, value.position.y, value.position.z);
		camera.lookAt(value.lookAt.x, value.lookAt.y, 0);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<T.DirectionalLight intensity="1" rotation={[3, 3, 3]} />
<T.PointLight intensity="200" position={[3, 3, 10]} />

<T.PerspectiveCamera
	makeDefault={true}
	bind:ref={camera}
	on:create={({ ref }) => {
		ref.position.set($tvCamera.position.x, $tvCamera.position.y, $tvCamera.position.z);
		ref.lookAt($tvCamera.lookAt.x, $tvCamera.lookAt.y, 0);
	}}
></T.PerspectiveCamera>

<Foreground />
