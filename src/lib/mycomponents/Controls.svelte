<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import VolumeSlider from "./VolumeSlider/VolumeSlider.svelte";

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
				sendEvent(false);
			}}
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
				class={`lucide lucide-chevron-right h-12 transition-all ${
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
		</button>
		<p
			class={` font-lato w-16 text-center text-6xl transition-opacity duration-500 ${
				isTransitioning ? "opacity-0" : "opacity-100"
			}`}
		>
			{currentPosition}
		</p>
		{#if currentPosition != 1}
			<button
				class=" relative flex h-20 w-20 items-center justify-center p-2"
				on:click={() => {
					sendEvent(true);
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={`lucide lucide-chevron-right h-12 transition-all ${
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
			</button>
		{/if}
	</div>

	<VolumeSlider bind:currentVolume />
	<p>volume: {currentVolume / 100}</p>
</div>
