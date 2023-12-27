<script lang="ts">
	import { T } from "@threlte/core";
	import Tv from "./TV.svelte";
</script>

<T.DirectionalLight intensity="1" rotation={[3, 3, 3]} />
<T.PointLight intensity="200" position={[3, 3, 10]} />

<T.PerspectiveCamera
	makeDefault={true}
	let:ref={camera}
	on:create={({ ref }) => {
		ref.position.set(1, 1, 4);
		ref.lookAt(-0.1, 1, 0);
	}}
></T.PerspectiveCamera>

<Tv />
