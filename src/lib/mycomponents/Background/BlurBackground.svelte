<script lang="ts" context="module">
	let func: (position: number) => Promise<void>;

	export let transitionHandler = (position: number) => {
		func(position);
	};
</script>

<script lang="ts">
	import { onMount } from "svelte";

	let currentPosition = 20;

	let isPreTransition = false;
	let isTransitioning = false;

	let size = 1;
	let xTranslate = 0;
	let yTranslate = 0;

	const startPreTransition = () => {
		isPreTransition = true;
		isTransitioning = true;
	};

	const endPreTransition = (position: number) => {
		isPreTransition = false;
		console.log(position);
		currentPosition = position;
	};

	const endTransition = () => {
		isTransitioning = false;
	};

	const transitionBG = async (position: number) => {
		console.log("transitionBG");
		startPreTransition();

		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});

		endPreTransition(position);

		await new Promise((resolve) => {
			setTimeout(resolve, 500);
		});

		endTransition();
	};

	onMount(() => {
		func = transitionBG;
	});
</script>

<div
	class="pointer-events-none fixed -z-10 flex h-screen w-screen bg-black transition-opacity duration-700"
	style={`opacity: ${isTransitioning ? "0" : "1"};`}
>
	<img
		class={`pointer-events-none fixed -z-10 aspect-square h-[200vh] opacity-20 blur-3xl transition-transform ease-linear`}
		style={`animation-duration: ${isTransitioning ? (isPreTransition ? "1" : "0") : "20"}s; 
            transition-duration: ${isTransitioning ? (isPreTransition ? "1" : "0") : "20"}s; 
            transform: translate3d(${isTransitioning ? "0, 0, 0" : "0, 0, 0"});`}
		src={`/Albums/${currentPosition}.webp`}
		alt="bg"
	/>
</div>
