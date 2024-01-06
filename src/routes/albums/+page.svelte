<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import { albums } from "$lib/albums";
	import VolumeSlider from "$lib/mycomponents/VolumeSlider/VolumeSlider.svelte";
	import TvCanvas from "$lib/mycomponents/3D/TV Background/TVCanvas.svelte";
	import ForegroundCanvas from "$lib/mycomponents/3D/TV Foreground/ForegroundCanvas.svelte";
	import PlayButtonCanvas from "$lib/mycomponents/3D/PlayButton/PlayButtonCanvas.svelte";
	import VideoMask, { handleResize } from "$lib/mycomponents/VideoMask.svelte";
	import { Sheet, Theatre } from "@threlte/theatre";
	import { StateEnums, type StateKeys } from "$lib/mycomponents/tvStatuses";

	import TvSequence from "$lib/mycomponents/3D/TVSequence.svelte";

	import { tweened } from "svelte/motion";
	import BlurBackground, {
		transitionHandler,
		bgResize
	} from "$lib/mycomponents/Background/BlurBackground.svelte";

	let isPlayButtonDestroyed = false;
	let isPlayerReady = false;
	let isStarted = false;
	let player: MediaPlayerElement;
	let currentVideoProps = albums[19].videoProps;

	let currentPosition = 20;
	let currentVolume = 50;
	let tweenedVolume = tweened(50);

	let tvSequenceStatus: StateKeys = StateEnums.preStart;

	let windowWidth: number;
	let windowHeight: number;

	const playVideo = async (index: number) => {
		if (tvSequenceStatus == StateEnums.preStart) tvSequenceStatus = StateEnums.start;
		else {
			transitionHandler(index + 1);
			tvSequenceStatus = StateEnums.transition;
			tweenedVolume.set(0);
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
		}
		if (currentPosition != index + 1) isPlayerReady = false;
		currentPosition = index + 1;

		currentVideoProps = albums[index].videoProps;
		while (!isPlayerReady) {
			console.log("waiting for player");
			await new Promise((resolve) => {
				setTimeout(resolve, 100);
			});
		}
		//player.paused = false;
		player.currentTime = currentVideoProps.startTime;
		tweenedVolume.set(currentVolume);
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
		bgResize(windowWidth, windowHeight);
		handleResize(windowWidth, windowHeight);
		if (isStarted) return;
		//document.addEventListener("scroll", checkPosition);
		isStarted = true;
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		await playVideo(19);
	};

	$: {
		tweenedVolume.set(currentVolume);
	}

	$: {
		if (isPlayerReady) {
			player.volume = $tweenedVolume / 100;
		}
	}

	let positions: number[] = [];
	for (let i = 0; i < albums.length; i++) {
		positions.push(i + 1);
	}
</script>

{#if !isPlayButtonDestroyed}
	<PlayButtonCanvas on:start={onStart} on:destroy={() => (isPlayButtonDestroyed = true)} />
{/if}

<svelte:window bind:innerWidth={windowWidth} bind:outerHeight={windowHeight} />

<Theatre studio={{ enabled: false }}>
	<TvSequence bind:status={tvSequenceStatus}>
		<!--
			<button class="fixed z-50 rounded-md bg-white" on:click={() => (isStarted = true)}>
				start
			</button>
			
		-->
		<div
			class={`fixed flex ${isStarted ? "h-[9500px]" : "h-720px"} w-screen flex-col text-slate-200`}
		>
			<div class=" relative flex h-screen w-screen flex-col overflow-hidden">
				<BlurBackground />
				<div
					class={`pointer-events-none fixed z-40 flex h-screen w-full flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
						isStarted ? "opacity-0" : " opacity-100"
					} `}
				/>
				<div class="p-4">
					<div class=" text-9xl">{albums[currentPosition - 1].artist}</div>
					<div class="h-20 w-20">
						<img src={`/Albums/${currentPosition}.webp`} alt="album art" />
					</div>
				</div>
				<div class=" top-[400px] flex w-full flex-wrap gap-4">
					{#each positions as position}
						<button
							on:click={() => {
								bgResize(windowWidth, windowHeight);
								handleResize(windowWidth, windowHeight);
								playVideo(positions.length - position);
							}}
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
				<div
					class={` pointer-events-none fixed -left-1/2 top-[24%] h-screen w-[200vw] scale-[0.70] md:top-[18%] md:scale-[0.85] lg:left-[-20%] lg:top-0 lg:scale-100`}
				>
					<div class="relative z-20 h-full w-full">
						<VideoMask>
							<Player bind:player bind:isPlayerReady videoProps={currentVideoProps}></Player>
						</VideoMask>

						<div class=" pointer-events-none fixed top-0 -z-10 h-[screen] w-screen">
							<div class="pointer-events-none relative h-full w-full">
								<TvCanvas />
							</div>
						</div>
						<div class=" pointer-events-none fixed top-0 z-10 h-[screen] w-screen">
							<div class="pointer-events-none relative h-full w-full">
								<ForegroundCanvas />
							</div>
						</div>
					</div>
				</div>

				<p>try scrolling down</p>
			</div>
		</div>
	</TvSequence>
</Theatre>
