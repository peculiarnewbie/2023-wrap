<script lang="ts">
	import { T, useTask, forwardEventHandlers } from "@threlte/core";
	import { SheetObject } from "@threlte/theatre";
	import { interactivity } from "@threlte/extras";
	import { spring } from "svelte/motion";

	import { createEventDispatcher } from "svelte";
	import { Group, MeshPhysicalMaterial } from "three";
	import { useGltf } from "@threlte/extras";

	export const ref = new Group();

	const gltf = useGltf("/models/PlayButton-transformed.glb", { useDraco: true });
	const component = forwardEventHandlers();

	const dispatch = createEventDispatcher();

	function triggerStart() {
		dispatch("disappear");
		dispatch("start");
	}

	const triggerHover = (hover: boolean) => {
		dispatch("hover", {
			value: hover
		});
	};

	interactivity();
	const scale = spring(1);

	let rotation = 0;

	useTask((delta) => {
		rotation += delta;
	});
</script>

<SheetObject key="PlayButton" let:Transform let:Sync>
	<Transform key="PlayButtonTransform">
		<T
			is={ref}
			dispose={false}
			{...$$restProps}
			bind:this={$component}
			scale={$scale}
			on:pointerenter={() => {
				scale.set(1.5);
				triggerHover(true);
			}}
			on:pointerleave={() => {
				scale.set(1);
				triggerHover(false);
			}}
			on:pointerdown={() => triggerStart()}
		>
			{#await gltf}
				<slot name="fallback" />
			{:then gltf}
				<SheetObject key="Plate" let:Transform let:Sync>
					<Transform key="PlateTransform">
						<T.Mesh receiveShadow geometry={gltf.nodes.Ring.geometry}>
							<T.MeshPhysicalMaterial color="#ff0000" />
						</T.Mesh>
					</Transform>
				</SheetObject>
				<SheetObject key="Play" let:Transform let:Sync>
					<Transform key="PlayTransform">
						<T.Mesh
							castShadow
							geometry={gltf.nodes.BezierCurve001.geometry}
							position={[-0.03, 0.15, 0]}
						>
							<T.MeshPhysicalMaterial color="#ffffff" />
						</T.Mesh>
					</Transform>
				</SheetObject>
			{:catch error}
				<slot name="error" {error} />
			{/await}

			<slot {ref} />
		</T>
	</Transform>
</SheetObject>

<!--
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
-->
