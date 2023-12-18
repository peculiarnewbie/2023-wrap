<script lang="ts">
	import { T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { SheetObject } from "@threlte/theatre";
	import MainSheet from "./MainSheet.svelte";
	import { useTask } from "@threlte/core";

	let fov = 40;

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});
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

<T.DirectionalLight position={[0, 10, 10]} />

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
			<T.Mesh receiveShadow castShadow rotation.y={rotation}>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshStandardMaterial color="#b00d03">
					<Sync color />
				</T.MeshStandardMaterial>
			</T.Mesh>
		</Transform>
	</SheetObject>
</MainSheet>
