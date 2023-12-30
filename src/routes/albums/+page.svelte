<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import { albums } from "$lib/albums";
	import { onDestroy, onMount } from "svelte";
	import VolumeSlider from "$lib/mycomponents/VolumeSlider/VolumeSlider.svelte";
	import TvCanvas from "$lib/mycomponents/3D/TV Background/TVCanvas.svelte";
	import ForegroundCanvas from "$lib/mycomponents/3D/TV Foreground/ForegroundCanvas.svelte";
	import PlayButtonCanvas from "$lib/mycomponents/3D/PlayButton/PlayButtonCanvas.svelte";
	import VideoMask from "$lib/mycomponents/VideoMask.svelte";
	import { Sheet, Theatre } from "@threlte/theatre";

	let man = "yo";
	let isPlayerReady = false;
	let isStarted = false;
	let player: MediaPlayerElement;
	let currentVideoProps = albums[0].videoProps;

	let currentPosition = 1;
	let currentVolume = 50;

	const playVideo = async (index: number) => {
		console.log("played?");
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
	};

	const checkPosition = (e: Event) => {
		if (isPlayerReady) {
			const scrollY = window.scrollY;
			if (scrollY > currentPosition * 1000 || scrollY < (currentPosition - 1) * 1000) {
				isPlayerReady = false;
				setTimeout(() => playVideo(Math.floor(scrollY / 1000)), 100);
			}
		}
	};

	const onStart = async () => {
		document.addEventListener("scroll", checkPosition);
		isStarted = true;
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		console.log("play");
		await playVideo(0);
	};

	$: {
		if (isPlayerReady) {
			player.volume = currentVolume / 100;
		}
	}

	onMount(() => {
		console.log("mounted");
	});
	onDestroy(() => {
		//document.removeEventListener("scroll", checkPosition);
	});

	let positions: number[] = [];
	for (let i = 0; i < albums.length; i++) {
		positions.push(i + 1);
	}
</script>

<!--
	<PlayButtonCanvas studio={false} on:start={onStart} />

-->
<Theatre studio={{ enabled: true }}>
	<button on:click={() => (isStarted = true)}> start </button>
	<div class={`flex ${isStarted ? "h-[9500px]" : "h-[720px]"} flex-col bg-black text-slate-200`}>
		<h1>Welcome to SvelteKit</h1>
		<p>
			Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
		</p>
		<div class="relative flex h-[1000px] w-full justify-center">
			<div class="fixed z-30 flex w-full max-w-5xl justify-center p-8">
				<div
					class={`pointer-events-none fixed z-40 flex h-[720px] w-full flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
						isStarted ? "opacity-0" : "opacity-100"
					} `}
				/>
				<VideoMask>
					<Player bind:player bind:isPlayerReady videoProps={currentVideoProps}></Player>
				</VideoMask>
				<!--
					<svg
					class=" fixed"
					id="video-mask"
					xmlns="http://www.w3.org/2000/svg"
				viewBox="-20 -10 200 120"
				preserveAspectRatio="xMidYMid slice"
				>
				<mask id="mask" x="0" y="0" width="100%" height="100%">
					<rect id="maskrect" x="0" y="0" width="100%" height="100%" fill="white" />
					<rect x="0" y="0" width="150" height="100" rx="20" />
				</mask>
				<rect x="0" y="0" width="100%" height="160" />
			</svg>
			
		-->
			</div>
		</div>
		<div class=" top-[400px] flex gap-4">
			{#each positions as position}
				<button
					on:click={() => playVideo(positions.length - position)}
					class={`rounded-md py-2 transition-all duration-200 ${
						currentPosition == positions.length - position + 1
							? "bg-orange-600 px-8"
							: "bg-cyan-500 px-4"
					}`}
				>
					{positions.length + 1 - position}
				</button>
			{/each}
		</div>
		<VolumeSlider bind:currentVolume />
		<p>volume: {currentVolume / 100}</p>
		<div class=" pointer-events-none fixed z-10 h-[720px] w-[1280px]">
			<TvCanvas />
		</div>

		<div class=" pointer-events-none fixed z-40 h-[720px] w-[1280px]">
			<ForegroundCanvas />
		</div>
		<p>try scrolling down</p>
	</div>
</Theatre>

<style>
</style>
