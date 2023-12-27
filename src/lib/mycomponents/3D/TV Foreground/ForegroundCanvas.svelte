<script lang="ts">
	import { Canvas } from "@threlte/core";
	import ForegroundScene from "./ForegroundScene.svelte";
</script>

<div class={` fixed z-40 h-screen w-screen`}>
	<Canvas>
		<ForegroundScene />
	</Canvas>
</div>
