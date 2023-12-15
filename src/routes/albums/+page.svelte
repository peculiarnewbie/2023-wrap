<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import type { VideoProps } from "$lib/types";
	import { albums } from "$lib/albums";
	import { onMount } from "svelte";

	let man = $state("yo");
	let isPlayerReady = $state(false);
	let player: MediaPlayerElement = $state();
	let currentVideoProps = $state(albums[0].videoProps);

	let currentPosition = $state(1);

	const playVideo = async (index: number) => {
		/*for (let i = 0; i < players.length; i++) {
			if (i == index) {
				players[i].paused = false;
				players[i].currentTime = albums[index].videosProps.start;
			} else {
				players[i].paused = true;
			}
		}
		const video = albums[index].videosProps;
		player.src = video.src;
		player.currentTime = video.startTime;
		
		*/
		currentPosition = index + 1;
		currentVideoProps = albums[index].videoProps;
		await new Promise((resolve) => {
			setTimeout(resolve, 100);
		});
		player.volume = 0.3;
		player.paused = false;
		player.currentTime = currentVideoProps.startTime;
	};

	const checkPosition = () => {
		const scrollY = window.scrollY;
		console.log(scrollY);
		if (scrollY > currentPosition * 1000 || scrollY < (currentPosition - 1) * 1000) {
			playVideo(Math.floor(scrollY / 1000));
		}
	};

	onMount(() => {
		document.addEventListener("scroll", checkPosition);
	});

	let positions: number[] = [];
	for (let i = 0; i < albums.length; i++) {
		positions.push(i + 1);
	}
</script>

<div class="flex h-[10000px] flex-col bg-black text-slate-200">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<div class="relative h-[600px] w-screen">
		<div class="fixed flex w-full justify-center p-16">
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
			</div>
		</div>
	</div>
</div>
