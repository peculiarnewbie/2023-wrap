<script lang="ts">
	import "../../../app.css";
	import Player from "$lib/Player.svelte";
	import type { MediaPlayerElement } from "vidstack/elements";

	let player: MediaPlayerElement;
</script>

<div class="player-wrapper">
	<Player
		isPlayerReady={true}
		videoProps={{
			title: "",
			src: "https://www.youtube.com/watch?v=toKJP3luQbI",
			startTime: 20,
			alt: "yoo"
		}}
		bind:player
	></Player>
</div>

<style>
	.player-wrapper {
		height: 720px;
		width: 300px;
		display: flex;
	}
</style>
