<script lang="ts">
	import type { ISheet } from "@theatre/core";
	import { Sheet } from "@threlte/theatre";
	import { onMount } from "svelte";
	import { clamp, mapLinear } from "three/src/math/MathUtils.js";

	export let name: string;
	let sheet: ISheet | undefined;

	/*
	export let useSpring = true;
    
	export let startAtScrollPosition = 0;
	export let endAtScrollPosition = 1;


	$: sheetProgress = Math.max(
		mapLinear(
			useSpring ? $springScrollPos : $scrollPos,
			startAtScrollPosition,
			endAtScrollPosition,
			0,
			10
		),
		0
	);
	$: if (sheet) {
		sheet.sequence.position = sheetProgress;
	}
    */
	onMount(() => {
		console.log(sheet);
		sheet.sequence.play();
	});
</script>

<Sheet bind:sheet {name}>
	<slot />
</Sheet>
