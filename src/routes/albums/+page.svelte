<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import Background from "$lib/mycomponents/Background.svelte";
	import { albums } from "$lib/albums";
	import { onDestroy, onMount } from "svelte";
	import VolumeSlider from "$lib/mycomponents/VolumeSlider/VolumeSlider.svelte";

	let man = $state("yo");
	let isPlayerReady = $state(false);
	let isStarted = $state(false);
	let player: MediaPlayerElement = $state();
	let currentVideoProps = $state(albums[0].videoProps);

	let currentPosition = $state(1);
	let currentVolume = $state(50);

	const playVideo = async (index: number) => {
		player.volume = 0;
		if (currentPosition != index + 1) isPlayerReady = false;
		currentPosition = index + 1;
		currentVideoProps = albums[index].videoProps;
		while (!isPlayerReady) {
			console.log("waiting for player");
			await new Promise((resolve) => {
				setTimeout(resolve, 100);
			});
		}
		console.log("played");
		//player.paused = false;
		player.currentTime = currentVideoProps.startTime;
		player.volume = currentVolume / 100;
		isStarted = true;
	};

	const checkPosition = () => {
		if (isPlayerReady) {
			const scrollY = window.scrollY;
			if (scrollY > currentPosition * 1000 || scrollY < (currentPosition - 1) * 1000) {
				isPlayerReady = false;
				setTimeout(() => playVideo(Math.floor(scrollY / 1000)), 100);
			}
		}
	};

	$effect(() => {
		player.volume = currentVolume / 100;
	});

	onMount(() => {
		document.addEventListener("scroll", checkPosition);
	});
	onDestroy(() => {
		document.removeEventListener("scroll", checkPosition);
	});

	let positions: number[] = [];
	for (let i = 0; i < albums.length; i++) {
		positions.push(i + 1);
	}
</script>

<div class={`flex ${isStarted ? "h-[3500px]" : "h-[720px]"} flex-col bg-black text-slate-200`}>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<div class="relative flex h-[600px] w-full justify-center">
		<div class="fixed flex w-full max-w-5xl justify-center p-8">
			{#if !isStarted}
				<div class="fixed z-50 flex h-[720px] w-full flex-col items-center justify-center bg-black">
					{#if isPlayerReady}
						<button
							class={`rounded-md bg-blue-500 px-4 py-2 text-2xl ${isPlayerReady ? "" : "hidden"}`}
							onclick={() => {
								playVideo(0);
							}}>Start</button
						>
					{:else}
						<p>loading...</p>
					{/if}
					<p class="pt-8">volume: {currentVolume / 100}</p>
					<VolumeSlider bind:currentVolume />
				</div>
			{/if}
			<div class="flex h-[720px] w-full flex-col">
				<div class={`${isPlayerReady ? "" : "border-4 border-red-500"}`}>
					<Player bind:player bind:isPlayerReady videoProps={currentVideoProps}></Player>
				</div>
				<div class="flex gap-4">
					{#each positions as position}
						<button
							onclick={() => playVideo(position - 1)}
							class={`rounded-md py-2 transition-all duration-200 ${
								currentPosition == position ? "bg-orange-600 px-8" : "bg-cyan-500 px-4"
							}`}
						>
							{position}
						</button>
					{/each}
				</div>
				<VolumeSlider bind:currentVolume />
				<p>volume: {currentVolume / 100}</p>
			</div>
		</div>
	</div>
	<p>try scrolling down</p>
</div>
