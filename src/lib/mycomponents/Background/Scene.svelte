<script lang="ts">
	import { T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { SheetObject } from "@threlte/theatre";
	import MainSheet from "./MainSheet.svelte";

	let fov = 40;
</script>

<!-- 
	<T.PerspectiveCamera
		makeDefault={true}
		on:create={({ ref }) => {
			ref.position.set(10, 10, 10);
			ref.lookAt(0, 0, 0);
		}}
	></T.PerspectiveCamera>

 -->
<MainSheet name="Main Sheet">
	<SheetObject key="Camera" let:Transform>
		<Transform key="CameraTransforms">
			<T.PerspectiveCamera
				{fov}
				makeDefault={true}
				let:ref={camera}
				on:create={({ ref }) => {
					ref.position.set(3, 3, 3);
					ref.lookAt(0, 0, 0);
				}}
			></T.PerspectiveCamera>
		</Transform>
	</SheetObject>
	<SheetObject key="Box" let:Transform let:Sync>
		<Transform key="BoxesTransform">
			<T.Mesh receiveShadow castShadow position.x={0.5} position.y={0.5}>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshBasicMaterial color="#b00d03">
					<Sync color />
				</T.MeshBasicMaterial>
			</T.Mesh>
		</Transform>
	</SheetObject>
</MainSheet>
