<script lang="ts">
	import { T } from "@threlte/core";
	import PlayButtonSheet from "./PlayButtonSheet.svelte";
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

<PlayButtonSheet name="Main Sheet" on:start on:destroy />
