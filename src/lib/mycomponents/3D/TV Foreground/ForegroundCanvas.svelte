<script lang="ts">
	import { Canvas } from "@threlte/core";
	import ForegroundScene from "./ForegroundScene.svelte";
</script>

<div
	class={` fixed -left-1/2 top-[24%] z-40 h-screen w-[200vw] scale-[0.70] lg:left-[-20%] lg:top-0 lg:scale-100`}
>
	<Canvas>
		<ForegroundScene />
	</Canvas>
</div>
