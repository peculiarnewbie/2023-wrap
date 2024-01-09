<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import VolumeSlider from "./VolumeSlider/VolumeSlider.svelte";
	import { albumLength, albums } from "$lib/albums";
	import { PUBLIC_DEV } from "$env/static/public";

	import posthog from "posthog-js";

	export let currentPosition: number;
	export let currentVolume: number;

	export let isTransitioning: boolean;
	export let isPreTransition: boolean;

	let nextDir: boolean;

	let reachedEnd = false;

	const dispatch = createEventDispatcher();

	const sendEvent = (next: boolean) => {
		nextDir = next;
		dispatch("switch", { value: next });

		if (next && currentPosition == 2 && !reachedEnd) {
			posthog.capture("reached end");
		}
	};

	onMount(() => {
		if (!PUBLIC_DEV) {
			posthog.init("phc_TKXoMp1iLDuHtw8lMrBEKKAKwc8uouhxBJS8tNYYiQb", {
				api_host: "https://us.posthog.com"
			});

			posthog.capture("visit");
		}
	});
</script>

<div class="fixed flex h-screen w-screen flex-col items-center justify-between">
	<div class=" h-20"></div>
	<div class="flex flex-col items-center self-center">
		<div class="flex items-center">
			<button
				class={` relative flex h-20 w-20 items-center justify-center p-2 transition-opacity duration-500 ${
					currentPosition != albumLength ? "opcaity-100" : " opacity-0"
				}`}
				on:click={() => {
					if (currentPosition == albumLength) return;
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
				class={` relative flex h-20 w-20 items-center justify-center p-2 transition-opacity duration-500 ${
					currentPosition != 1 ? "opcaity-100" : " opacity-0"
				}`}
				on:click={() => {
					if (currentPosition == 1) return;
					sendEvent(true);
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
			</button>
		</div>

		<VolumeSlider bind:currentVolume />
		<p>volume: {currentVolume}%</p>
	</div>
	<div class="flex w-full items-center justify-center gap-4 p-3 lg:justify-end">
		<a
			href="https://www.youtube.com/playlist?list=PLQG7Jc1PJtPRv3r2akBHZ_xgNhUGbb3tX"
			target="_blank"
			class=" flex h-8 items-center rounded-md"
			>playlist: <img class="h-full" src="/YT.png" alt="youtube playlist" /></a
		>
		<div class="flex gap-1 lg:flex-col lg:gap-0">
			<p>{"made by "}</p>
			<a href="https://peculiarnewbie.com" target="_blank" class=" underline">peculiarnewbie</a>
		</div>
	</div>
</div>
