<script lang="ts">
	import { albums } from "$lib/albums";

	export let isPreTransition: boolean;
	export let isTransitioning: boolean;

	export let currentPosition: number;
</script>

<div
	class=" flex h-[50vh] flex-col items-center p-4 text-center lg:h-screen lg:items-start lg:text-left"
>
	<div
		class={` fixed h-max overflow-hidden whitespace-nowrap pb-8 transition-[width,opacity] duration-700 ${
			isTransitioning ? "w-0" : "w-full"
		}`}
	>
		<div
			class="text-3xl transition-all duration-200 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
		>
			{albums[currentPosition - 1].artist}
		</div>
	</div>
	<div class=" h-12 sm:h-14 md:h-16 lg:h-20 xl:h-28 2xl:h-40" />
	<div class=" h-1 w-screen md:h-2">
		<div
			class={`h-full w-[110vw] rounded-full bg-slate-200 blur-sm transition-all 
        ${
					isTransitioning
						? isPreTransition
							? "-translate-x-[10vw] duration-700"
							: "translate-x-[115vw] duration-500"
						: "-translate-x-[115vw] duration-0"
				}`}
		/>
	</div>
	<div class="h-max overflow-hidden pb-4">
		<div
			class={` pl-2 text-lg transition-transform duration-700 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl
			${isTransitioning ? " -translate-y-28" : "translate-y-0 "}
		`}
		>
			{albums[currentPosition - 1].title}
		</div>
	</div>
	<div class="relative flex h-full w-1/2 shrink items-center justify-center p-16">
		<img
			class={`fixed m-auto aspect-square h-44 rounded-lg shadow-xl shadow-neutral-800 transition-all lg:h-80 lg:rounded-2xl xl:h-[480px] 2xl:h-[600px]
				${
					isTransitioning
						? isPreTransition
							? " rotate-180 scale-0 opacity-0 duration-700"
							: "-rotate-180 scale-0 opacity-0 duration-0"
						: " rotate-0 scale-100 opacity-100 duration-700"
				}
			`}
			style={`${
				isTransitioning
					? "box-shadow: 0 0px 25px 15px rgb(255 255 255 / 0), 0 8px 10px -6px rgb(255 255 255 / 0);"
					: "box-shadow: 0 0px 25px 15px rgb(255 255 255 / 0.1), 0 8px 10px -6px rgb(255 255 255 / 0.1);"
			}`}
			src={`/Albums/${currentPosition}.webp`}
			alt="album art"
		/>
		<img
			class="fixed -z-10 m-auto aspect-square h-44 scale-110 rounded-lg opacity-50 blur-2xl transition-all duration-1000 lg:h-80 lg:rounded-2xl xl:h-[480px] 2xl:h-[600px]"
			style={`${isTransitioning ? "height: 0px !important;" : ""}`}
			src={`/Albums/${currentPosition}.webp`}
			alt="album art"
		/>
	</div>
</div>
