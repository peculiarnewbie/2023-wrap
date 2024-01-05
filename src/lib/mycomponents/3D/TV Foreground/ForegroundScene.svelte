<script lang="ts">
	import { T } from "@threlte/core";
	import Foreground from "./Foreground.svelte";
	import Tv from "../TV Background/TV.svelte";
	import type { PerspectiveCamera } from "three";
	import { onDestroy, onMount } from "svelte";

	let camera: PerspectiveCamera;

	onMount(() => {
		camera.position.set(0, -1, 5);
		camera.lookAt(0, 0, 0);
	});
</script>

<T.DirectionalLight intensity="1" rotation={[3, 3, 3]} />
<T.PointLight intensity="200" position={[3, 3, 10]} />

<T.PerspectiveCamera makeDefault={true} bind:ref={camera}></T.PerspectiveCamera>

<Foreground />
