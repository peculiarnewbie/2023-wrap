<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import VolumeSlider from "./VolumeSlider/VolumeSlider.svelte";
	import { albumLength, albums } from "$lib/albums";

	export let currentPosition: number;
	export let currentVolume: number;

	export let isTransitioning: boolean;
	export let isPreTransition: boolean;

	let nextDir: boolean;

	const dispatch = createEventDispatcher();

	const sendEvent = (next: boolean) => {
		nextDir = next;
		dispatch("switch", { value: next });
	};

	$: nextPosition = nextDir ? currentPosition + 1 : currentPosition - 1;
</script>

<div class="fixed flex h-screen w-screen flex-col items-center justify-center">
	<!--
	<div class="  flex w-1/2 flex-wrap gap-4">
            {#each Array(20) as _, index}
                <button
                    on:click={() => {
                        console.log(20 - index);
                        /*
                        bgResize(windowWidth, windowHeight);
                        handleResize(windowWidth, windowHeight);
                        playVideo(_.length - index);
                        */
                    }}
                    class={`rounded-md py-2 transition-all duration-200 ${
                        currentPosition == 20 - index ? "bg-orange-600 px-8" : "bg-cyan-500 px-4"
                    }`}
                >
                    {20 - index}
                </button>
            {/each}

        </div>
    -->
	<div class="flex items-center">
		<button
			class=" relative flex h-20 w-20 items-center justify-center p-2"
			on:click={() => {
				if (currentPosition == albumLength) return;
				sendEvent(false);
			}}
		>
			{#if currentPosition != albumLength}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={`lucide lucide-chevron-right fixed transition-all ${
						isTransitioning && !nextDir
							? " h-10 w-10 -translate-x-5 opacity-0 duration-700"
							: " h-12 w-12 opacity-80 duration-0"
					}`}><path d="m15 18-6-6 6-6" /></svg
				>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={`lucide lucide-chevron-right fixed transition-all ${
						isTransitioning && !nextDir
							? "h-12 w-12 translate-x-0 opacity-80 duration-700"
							: " h-16 w-16 translate-x-5 opacity-0 duration-0"
					}`}><path d="m15 18-6-6 6-6" /></svg
				>
			{/if}
		</button>
		<div class="relative flex w-16 items-center justify-center text-center font-lato text-6xl">
			<p
				class={` transition-all ${
					isTransitioning
						? (nextDir ? "translate-y-8" : "-translate-y-8") + " scale-50 opacity-0 duration-500"
						: " translate-x-0 scale-100 opacity-100 duration-0"
				}`}
			>
				{currentPosition}
			</p>
			<p
				class={` fixed transition-all ${
					isTransitioning
						? isPreTransition
							? `scale-0 opacity-0 duration-0 ${nextDir ? "-translate-y-8" : "translate-y-8"}`
							: "translate-x-0 scale-100 opacity-100 duration-500"
						: "scale-0 opacity-0 duration-0"
				}`}
			>
				{currentPosition}
			</p>
		</div>
		<button
			class=" relative flex h-20 w-20 items-center justify-center p-2"
			on:click={() => {
				if (currentPosition == 1) return;
				sendEvent(true);
			}}
		>
			{#if currentPosition != 1}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={`lucide lucide-chevron-right fixed transition-all ${
						isTransitioning && nextDir
							? " h-10 w-10 translate-x-5 opacity-0 duration-700"
							: " h-12 w-12 opacity-80 duration-0"
					}`}
					><path d="m9 18 6-6-6-6" />
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={`lucide lucide-chevron-right fixed transition-all ${
						isTransitioning && nextDir
							? "h-12 w-12 opacity-80 duration-700"
							: " h-16 w-16 -translate-x-5 opacity-0 duration-0"
					}`}
					><path d="m9 18 6-6-6-6" />
				</svg>
			{/if}
		</button>
	</div>

	<VolumeSlider bind:currentVolume />
	<p>volume: {currentVolume / 100}</p>
</div>
