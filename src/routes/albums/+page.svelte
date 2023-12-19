<script lang="ts">
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import Background from "$lib/mycomponents/Background/Background.svelte";
	import { albums } from "$lib/albums";
	import { onDestroy, onMount } from "svelte";
	import VolumeSlider from "$lib/mycomponents/VolumeSlider/VolumeSlider.svelte";

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
		await new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
		isStarted = true;
		await new Promise((resolve) => {
			setTimeout(resolve, 500);
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

<Background studio={false} on:start={onStart} />
<div
	style={`${
		isStarted
			? "--height: 3500px; --color: var(--color-slate-700)"
			: "--height: 720px; --color: white"
	}; --display: flex; --flex-direction: column; --background-color: black;`}
>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<div class="relative flex h-[600px] w-full justify-center">
		<div class="fixed z-30 flex w-full max-w-5xl justify-center p-8">
			<div
				class={`pointer-events-none fixed z-40 flex h-[720px] w-full flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
					isStarted ? "opacity-0" : "opacity-100"
				} `}
			/>
			<div class="z-20 flex h-[720px] w-full flex-col">
				<!--
					<Player bind:player bind:isPlayerReady videoProps={currentVideoProps}></Player>

				-->
				<div class="flex gap-4">
					{#each positions as position}
						<button
							on:click={() => playVideo(position - 1)}
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
