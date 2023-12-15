<script lang="ts">
	import "../../app.css";
	import Player from "$lib/Player.svelte";
	import { MediaPlayerElement } from "vidstack/elements";
	import type { videoProps } from "$lib/types";

	let man = $state("yo");
	let isPlayerReady = $state(false);
	let players: MediaPlayerElement[] = $state([new MediaPlayerElement(), new MediaPlayerElement()]);

	const playVideo = (index: number) => {
		for (let i = 0; i < players.length; i++) {
			if (i == index) {
				players[i].paused = false;
				players[i].currentTime = videosProps[index].start;
				players[i].volume = 0.3;
			} else {
				players[i].paused = true;
			}
		}
		man = "lah";
	};

	let videosProps: videoProps[] = [
		{
			src: "https://www.youtube.com/watch?v=vx4kLgnFexo",
			thumbnail: "https://i.ytimg.com/vi/vx4kLgnFexo/maxresdefault.jpg",
			start: 66
		},
		{
			src: "https://www.youtube.com/watch?v=toKJP3luQbI",
			thumbnail: "https://i.ytimg.com/vi/toKJP3luQbI/maxresdefault.jpg",
			start: 57
		}
	];
</script>

<div class="flex flex-col text-slate-200">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	{#each videosProps as video, i}
		<div class="flex h-[720px] w-[1200px]">
			<Player bind:player={players[i]} bind:isPlayerReady videoProps={video}></Player>
			{#if isPlayerReady}
				<button onclick={() => playVideo(i)} class="p-2"> Play </button>
				<p>{players[i].qualities.length}</p>
			{/if}
		</div>
	{/each}
</div>
