<script lang="ts">
	import { T } from "@threlte/core";
	import type { ISheet } from "@theatre/core";
	import { Sheet, SheetObject } from "@threlte/theatre";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import StartButton from "./StartButton.svelte";
	import { AmbientLight, DirectionalLight } from "three";

	export let name: string;
	let sheet: ISheet | undefined;

	let fov = 40;

	let disappeared = false;

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

	const dispatch = createEventDispatcher();

	let isPlaying = true;
	let intervalId: number;

	const manageState = () => {
		const pause = () => {
			sheet.sequence.pause();
			isPlaying = false;
		};
		if (!isPlaying) return;
		if (sheet.sequence.position > 1.1 && sheet.sequence.position < 2) pause();
		else if (sheet.sequence.position > 4.5 && sheet.sequence.position < 5) pause();
		else if (sheet.sequence.position > 9.5 && sheet.sequence.position < 10) pause();
		else if (sheet.sequence.position > 19) {
			console.log("button destroyed");
			dispatch("destroy", {
				value: "playButton"
			});
		}
	};

	const handleHover = (e: any) => {
		if (disappeared) return;
		if (e.detail.value) {
			sheet.sequence.position = 4;
			sheet.sequence.play();
		} else {
			sheet.sequence.position = 9;
			sheet.sequence.play();
		}
		isPlaying = true;
	};

	const handleDisappear = () => {
		disappeared = true;
		isPlaying = true;
		sheet.sequence.position = 13;
		sheet.sequence.play({ rate: 3 });
	};

	onMount(() => {
		console.log(sheet);
		sheet.sequence.play();
		sheet.sequence.position;

		intervalId = setInterval(manageState, 100);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<T.DirectionalLight intensity="1" rotation={[30, 0, 0]} />
<T.AmbientLight />

<Sheet bind:sheet {name}>
	<SheetObject key="Light" let:Transform>
		<Transform key="LightTransform">
			<T.PointLight castShadow intensity="5000" decay="2.3" position={[0, 0, 0]} />
		</Transform>
	</SheetObject>
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

	<StartButton on:start on:hover={handleHover} on:disappear={handleDisappear} />
</Sheet>
