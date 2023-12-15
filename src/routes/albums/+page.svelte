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
				players[i].currentTime = albums[index].videosProps.start;
				players[i].volume = 0.3;
			} else {
				players[i].paused = true;
			}
		}
		man = "lah";
	};

	let albums = [
		{
			pos: 1,
			artist: "Paramore",
			title: "This is Why",
			albumArt: "",
			videosProps: {
				title: "Paramore - Running Out of Time",
				src: "https://www.youtube.com/watch?v=toKJP3luQbI",
				thumbnail: "https://i.ytimg.com/vi/toKJP3luQbI/maxresdefault.jpg",
				start: 57,
				alt: "my favorite"
			}
		},
		{
			pos: 3,
			artist: "Black Country, New Road",
			title: "Live at Bush Hall",
			albumArt: "",
			videosProps: {
				title: "Black Country, New Road - 'Live at Bush Hall'",
				src: "https://www.youtube.com/watch?v=VbHV8oObR54&t=2751s",
				thumbnail: "https://i.ytimg.com/vi/VbHV8oObR54/maxresdefault.jpg",
				start: 2726,
				alt: "so happy they're still together"
			}
		},
		{
			pos: 8,
			artist: "Mitski",
			title: "My Love Mine All Mine",
			albumArt: "",
			videosProps: {
				title: "Mitski - My Love Mine All Mine",
				src: "https://www.youtube.com/watch?v=vx4kLgnFexo",
				thumbnail: "https://i.ytimg.com/vi/vx4kLgnFexo/maxresdefault.jpg",
				start: 66,
				alt: "very chill and sad"
			}
		}
	];
</script>

<div class="flex flex-col text-slate-200">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	{#each albums as album, i}
		<div class="flex justify-center">
			<div class="flex h-[720px] w-[1200px] flex-col">
				<Player bind:player={players[i]} bind:isPlayerReady videoProps={album.videosProps}></Player>
				{#if isPlayerReady}
					<button onclick={() => playVideo(i)} class="p-2"> Play </button>
					<p>{players[i].qualities.length}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>
