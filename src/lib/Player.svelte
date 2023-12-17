<script lang="ts">
	// Import styles.
	import "vidstack/player/styles/base.css";
	// Register elements.
	import "vidstack/player";
	import "vidstack/player/ui";
	import "vidstack/icons";

	import { onMount } from "svelte";
	import { isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent } from "vidstack";
	import type { MediaPlayerElement } from "vidstack/elements";

	import VideoLayout from "./components/layouts/VideoLayout.svelte";
	import type { VideoProps } from "./types";

	export let player: MediaPlayerElement;
	export let isPlayerReady: boolean;
	export let videoProps: VideoProps;

	let currentSrc = "";

	onMount(() => {
		console.log("mounted");
		/**
		 * You can add these tracks using HTML as well.
		 *
		 * @example
		 * ```html
		 * <media-provider>
		 *   <track label="..." src="..." kind="..." srclang="..." default />
		 *   <track label="..." src="..." kind="..." srclang="..." />
		 * </media-provider>
		 * ```
		 */

		// Subscribe to state updates.
		return player.subscribe(({ paused, viewType }) => {
			// console.log('is paused?', '->', paused);
			// console.log('is audio view?', '->', viewType === 'audio');
		});
	});

	function onProviderChange(event: MediaProviderChangeEvent) {
		const provider = event.detail;
		// We can configure provider's here.
		if (isHLSProvider(provider)) {
			provider.config = {};
		}
	}

	const setTime = async () => {
		console.log("ready");
		await new Promise((resolve) => {
			setTimeout(resolve, 200);
		});
	};

	// We can listen for the `can-play` event to be notified when the player is ready.
	function onCanPlay(event: MediaCanPlayEvent) {
		console.log("rede");
		isPlayerReady = true;
		//setTime();
		// ...
	}

	$: {
		console.log("video changed: getting ready", videoProps.title);
		if (videoProps.src != currentSrc) {
			currentSrc = videoProps.src;
			isPlayerReady = false;
		}
	}
</script>

<media-player
	class="aspect-video w-full overflow-hidden rounded-md bg-slate-900 font-sans text-white ring-media-focus data-[focus]:ring-4"
	title={videoProps.title}
	src={videoProps.src}
	load="eager"
	crossorigin
	playsinline
	on:provider-change={onProviderChange}
	on:can-play={onCanPlay}
	bind:this={player}
>
	<media-provider>
		<media-poster
			class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
			alt={videoProps.alt}
		/>
	</media-provider>

	<VideoLayout />
</media-player>
