<script lang="ts" context="module">
	export let bgResize: (w: number, h: number) => void;
</script>

<script lang="ts">
	import { onMount } from "svelte";

	export let currentPosition = 20;

	let size = 1;

	export let isPreTransition: boolean;
	export let isTransitioning: boolean;

	const resize = (w: number, h: number) => {
		size = w * 2;
		if (h > w) size = h * 2;
	};

	onMount(() => {
		bgResize = resize;
	});
</script>

<div
	class="pointer-events-none fixed -z-10 flex h-screen w-screen overflow-hidden bg-black blur-3xl transition-opacity duration-700"
	style={`opacity: ${isTransitioning ? "0" : "1"};`}
>
	<div class="relative aspect-square" style={`height: ${size}px; width: ${size}px;`}>
		<img
			class={`pointer-events-none -z-10 h-full opacity-25 transition-transform ease-linear`}
			style={`animation-duration: ${isTransitioning ? (isPreTransition ? "1" : "0") : "30"}s; 
            transition-duration: ${isTransitioning ? (isPreTransition ? "1" : "0") : "30"}s; 
            transform: translate3d(${
							isTransitioning
								? isPreTransition
									? `-${size / 2}px, -${size / 2}px, 0`
									: "0,0,0"
								: `-${size / 2}px, -${size / 2}px, 0`
						} );`}
			src={`/Albums/${currentPosition}.webp`}
			alt="bg"
		/>
	</div>
</div>
