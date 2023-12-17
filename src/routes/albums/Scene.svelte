<script lang="ts">
	import { T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { SheetObject } from "@threlte/theatre";
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.Mesh position.y={1}>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshBasicMaterial color="hotpink" />
</T.Mesh>

<!-- Box -->
<SheetObject key="Box" let:Transform let:Sync>
	<Transform>
		<T.Mesh receiveShadow castShadow position.x={0.5} position.y={0.5}>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial color="#b00d03">
				<Sync color />
			</T.MeshBasicMaterial>
		</T.Mesh>
	</Transform>
</SheetObject>
