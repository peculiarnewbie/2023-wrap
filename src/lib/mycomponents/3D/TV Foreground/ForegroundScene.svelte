<script lang="ts">
	import { T } from "@threlte/core";
	import Foreground from "./Foreground.svelte";
	import Tv from "../TV Background/TV.svelte";
</script>

<T.DirectionalLight intensity="1" rotation={[3, 3, 3]} />
<T.PointLight intensity="200" position={[3, 3, 10]} />

<T.PerspectiveCamera
	makeDefault={true}
	let:ref={camera}
	on:create={({ ref }) => {
		ref.position.set(0, -1, 5);
		ref.lookAt(0, 0, 0);
	}}
></T.PerspectiveCamera>

<Foreground />
