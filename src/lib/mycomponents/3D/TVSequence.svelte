<script lang="ts">
	import type { ISheet } from "@theatre/core";
	import { Sheet, SheetObject } from "@threlte/theatre";
	import { onDestroy, onMount } from "svelte";

	const StateEnums = {
		preStart: -1,
		start: 0,
		transition: 1
	} as const;

	type StateKeys = (typeof StateEnums)[keyof typeof StateEnums];

	const states: { name: StateKeys; startTime: number; endTime: number }[] = [
		{ name: StateEnums.start, startTime: 0, endTime: 4 },
		{ name: StateEnums.transition, startTime: 5, endTime: 9 }
	];

	export let status = StateEnums.preStart;
	let isPlaying = false;
	let intervalId: number;

	let sheet: ISheet | undefined;

	const playState = (state: StateKeys) => {
		sheet.sequence.position = states[state].startTime;
		sheet.sequence.play();
		isPlaying = true;
	};

	$: {
		playState(status);
	}

	onMount(() => {
		intervalId = setInterval(manageState, 100);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<Sheet bind:sheet>
	<slot />
</Sheet>
