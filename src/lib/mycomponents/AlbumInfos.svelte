<script lang="ts">
	import { albums } from "$lib/albums";

	export let isPreTransition: boolean;
	export let isTransitioning: boolean;

	export let currentPosition: number;
</script>

<div
	class=" flex h-[50vh] flex-col items-center p-4 text-center lg:h-screen lg:items-start lg:text-left"
>
	<div class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
		{albums[currentPosition - 1].artist}
	</div>
	<div class="h-2 w-screen">
		<div
			class={`h-full w-[110vw] rounded-full bg-slate-200 blur-sm transition-all duration-700
        ${
					isTransitioning
						? isPreTransition
							? "-translate-x-[10vw]"
							: "translate-x-[115vw]"
						: "-translate-x-[115vw] duration-0"
				}`}
		/>
	</div>
	<div class=" pl-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
		{albums[currentPosition - 1].title}
	</div>
	<div class="relative flex h-full w-1/2 shrink items-center justify-center p-16">
		<img
			class="fixed z-10 m-auto aspect-square h-48 rounded-lg shadow-xl shadow-neutral-800 transition-all duration-700 lg:h-80 lg:rounded-2xl xl:h-[480px] 2xl:h-[600px]"
			style={`${
				isTransitioning
					? "box-shadow: 0 0px 25px 15px rgb(255 255 255 / 0), 0 8px 10px -6px rgb(255 255 255 / 0);"
					: "box-shadow: 0 0px 25px 15px rgb(255 255 255 / 0.1), 0 8px 10px -6px rgb(255 255 255 / 0.1);"
			}`}
			src={`/Albums/${currentPosition}.webp`}
			alt="album art"
		/>
		<img
			class="fixed m-auto aspect-square h-48 scale-110 rounded-lg opacity-50 blur-2xl lg:h-80 lg:rounded-2xl xl:h-[480px] 2xl:h-[600px]"
			src={`/Albums/${currentPosition}.webp`}
			alt="album art"
		/>
	</div>
</div>
