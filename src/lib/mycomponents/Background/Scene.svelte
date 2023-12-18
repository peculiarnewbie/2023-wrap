<script lang="ts">
	import { T } from "@threlte/core";
	import { OrbitControls, interactivity } from "@threlte/extras";
	import { SheetObject } from "@threlte/theatre";
	import MainSheet from "./MainSheet.svelte";
	import { useTask } from "@threlte/core";
	import { spring } from "svelte/motion";
	import StartButton from "./components/StartButton.svelte";
	import Button from "./components/Button.svelte";

	let fov = 40;

	const handleMessage = (e: CustomEvent<any>) => {
		alert(e.detail.text);
	};
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
					ref.position.set(0, 0, 0);
					ref.lookAt(0, 0, 0);
				}}
			></T.PerspectiveCamera>
		</Transform>
	</SheetObject>
	<SheetObject key="PlayButton" let:Transform>
		<Transform key="PlayButtonTransform">
			<Button />
		</Transform>
	</SheetObject>
	<StartButton on:start />
</MainSheet>
