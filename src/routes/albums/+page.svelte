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
	import BlurBackground, { bgResize } from "$lib/mycomponents/Background/BlurBackground.svelte";
	import AlbumInfos from "$lib/mycomponents/AlbumInfos.svelte";
	import Controls from "$lib/mycomponents/Controls.svelte";
	import type { EventDispatcher } from "svelte";
	import { goto } from "$app/navigation";

	let isPlayButtonDestroyed = false;
	let isPlayerReady = false;
	let isStarted = false;
	let player: MediaPlayerElement;

	const urlParams = new URLSearchParams(window.location.search);
	const currentIndex = urlParams.get("i") ?? "20";

	let currentPosition: number = parseInt(currentIndex);
	let currentVideoProps = albums[currentPosition - 1].videoProps;
	let currentVolume = 50;
	let tweenedVolume = tweened(50);

	let tvSequenceStatus: StateKeys = StateEnums.preStart;

	let windowWidth: number;
	let windowHeight: number;

	let isPreTransition = false;
	let isTransitioning = false;

	const startPreTransition = () => {
		isPreTransition = true;
		isTransitioning = true;
	};

	const endPreTransition = (position: number) => {
		isPreTransition = false;
		//console.log(position);
		currentPosition = position;
	};

	const endTransition = () => {
		isTransitioning = false;
	};

	const transitionHandler = async (position: number) => {
		await new Promise((resolve) => {
			setTimeout(resolve, 0);
		});
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

	const playVideo = async (index: number) => {
		if (tvSequenceStatus == StateEnums.preStart) tvSequenceStatus = StateEnums.start;
		else {
			transitionHandler(index + 1);
			tvSequenceStatus = StateEnums.transition;
			tweenedVolume.set(-1);
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
		}
		if (currentPosition != index + 1) isPlayerReady = false;
		currentPosition = index + 1;

		currentVideoProps = albums[index].videoProps;
		while (!isPlayerReady) {
			//console.log("waiting for player");
			await new Promise((resolve) => {
				setTimeout(resolve, 100);
			});
		}
		//player.paused = false;
		player.currentTime = currentVideoProps.startTime;
		tweenedVolume.set(currentVolume);
		goto(`?i=${currentPosition}`);
	};

	const switchVideo = (e: CustomEvent) => {
		//console.log(e.detail.value);
		bgResize(windowWidth, windowHeight);
		handleResize(windowWidth, windowHeight);
		playVideo(e.detail.value ? currentPosition - 2 : currentPosition);
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
		document.getElementById("loadingText").style.display = "none";
		bgResize(windowWidth, windowHeight);
		handleResize(windowWidth, windowHeight);
		if (isStarted) return;
		//document.addEventListener("scroll", checkPosition);
		isStarted = true;
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		await playVideo(currentPosition - 1);
	};

	const setPlayerVolume = (vol: number, player: MediaPlayerElement) => {
		if (vol < 1) player.muted = true;
		else {
			player.muted = false;
			player.volume = vol / 100;
		}
	};

	$: {
		tweenedVolume.set(currentVolume);
	}

	$: {
		if (isPlayerReady) {
			setPlayerVolume($tweenedVolume, player);
		}
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
			class={`fixed top-0 flex ${
				isStarted ? "h-[9500px]" : "h-720px"
			} w-screen flex-col text-slate-200`}
		>
			<div class=" relative flex h-screen w-screen flex-col overflow-hidden">
				<BlurBackground {isPreTransition} {isTransitioning} {currentPosition} />
				<div
					id="curtain"
					class={`pointer-events-none fixed z-40 flex h-screen w-full flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
						isStarted ? "opacity-0" : " opacity-100"
					} `}
				/>
				<AlbumInfos {isPreTransition} {isTransitioning} {currentPosition} />

				<Controls
					bind:currentVolume
					bind:currentPosition
					on:switch={switchVideo}
					{isTransitioning}
					{isPreTransition}
				/>

				<div
					class={` pointer-events-none fixed -left-1/2 top-[26%] h-screen w-[200vw] scale-[0.70] md:top-[19%] md:scale-[0.85] lg:left-[-20%] lg:top-0 lg:scale-100`}
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
			</div>
		</div>
	</TvSequence>
</Theatre>
