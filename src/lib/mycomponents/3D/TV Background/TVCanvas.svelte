<script lang="ts">
	import { Canvas } from "@threlte/core";
	import TvScene from "./TVScene.svelte";
</script>

<div class={` fixed z-40 h-screen w-screen`}>
	<Canvas>
		<TvScene />
	</Canvas>
</div>
