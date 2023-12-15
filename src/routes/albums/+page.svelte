<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";
	import type { VideoProps } from "$lib/types";
	import { albums } from "$lib/albums";

	let man = $state("yo");
	let isPlayerReady = $state(false);
	let player: MediaPlayerElement = $state();
	let currentVideoProps = $state(albums[0].videoProps);

	let positions: number[] = $state([]);

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
		currentVideoProps = albums[index].videoProps;
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		player.volume = 0.3;
		player.paused = false;
		player.currentTime = currentVideoProps.startTime;
		man = "lah";
	};

	for (let i = 0; i < albums.length; i++) {
		positions.push(i + 1);
	}
</script>

<div class="flex flex-col bg-black text-slate-200">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<div class="flex justify-center p-16">
		<div class="flex h-[720px] w-[1200px] flex-col">
			<div class={`${isPlayerReady ? "" : "border-4 border-red-500"}`}>
				<Player bind:player bind:isPlayerReady videoProps={currentVideoProps}></Player>
			</div>
			{#if isPlayerReady}
				<div class="flex gap-4">
					{#each positions as position}
						<button onclick={() => playVideo(position)} class="rounded-md bg-cyan-500 px-4 py-2">
							{position}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
