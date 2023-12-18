<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import { SheetObject } from "@threlte/theatre";
	import { interactivity } from "@threlte/extras";
	import { spring } from "svelte/motion";

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function triggerStart() {
		dispatch("start");
	}

	interactivity();
	const scale = spring(1);

	let rotation = 0;

	useTask((delta) => {
		rotation += delta;
	});
</script>

<SheetObject key="Box" let:Transform let:Sync>
	<Transform key="BoxesTransform">
		<T.Mesh
			receiveShadow
			castShadow
			rotation.y={rotation}
			scale={$scale}
			on:pointerenter={() => scale.set(1.5)}
			on:pointerleave={() => scale.set(1)}
			on:pointerdown={() => triggerStart()}
		>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshStandardMaterial color="#b00d03">
				<Sync color />
			</T.MeshStandardMaterial>
		</T.Mesh>
	</Transform>
</SheetObject>
