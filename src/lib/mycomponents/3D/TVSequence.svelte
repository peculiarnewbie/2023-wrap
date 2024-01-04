<script lang="ts">
	import type { ISheet } from "@theatre/core";
	import { Sheet, SheetObject } from "@threlte/theatre";
	import { onDestroy, onMount } from "svelte";
	import { StateEnums, type StateKeys } from "../tvStatuses";

	const states: { name: StateKeys; startTime: number; endTime: number }[] = [
		{ name: StateEnums.start, startTime: 0, endTime: 3 },
		{ name: StateEnums.transition, startTime: 5, endTime: 7 }
	];

	export let status: StateKeys;
	let isPlaying = false;
	let intervalId: number;

	let sheet: ISheet | undefined;

	const playState = (state: StateKeys) => {
		if (state == StateEnums.preStart) return;
		sheet.sequence.position = states[state].startTime;
		sheet.sequence.play();
		isPlaying = true;
	};

	const watchState = () => {
		if ((!isPlaying && status == StateEnums.preStart) || status == StateEnums.paused) return;
		if (sheet.sequence.position > states[status].endTime) {
			sheet.sequence.pause();
			status = StateEnums.paused;
			isPlaying = false;
		}
	};

	$: {
		//console.log("status:", status);
		if (status !== StateEnums.paused) playState(status);
	}

	onMount(() => {
		intervalId = setInterval(watchState, 100);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<Sheet bind:sheet>
	<slot />
</Sheet>
