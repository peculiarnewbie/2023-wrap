<script lang="ts">
	import { onMount } from "svelte";
	import SliderPreview from "./SliderPreview.svelte";
	import SliderThumb from "./SliderThumb.svelte";
	let { currentVolume } = $props<{ currentVolume: number }>();

	let focus = $state(false);
	let active = $state(false);
	let dragging = $state(false);

	let group: HTMLElement = $state();

	const changeVolume = (e: PointerEvent) => {
		let pos = e.clientX - group.getBoundingClientRect().left;
		if (pos < 0) pos = 0;
		else if (pos > group.clientWidth) pos = group.clientWidth;

		const volume = Math.floor((pos * 100) / group.clientWidth);

		currentVolume = volume;
	};

	const setDragging = (e: PointerEvent) => {
		if (e.type == "pointerdown") {
			dragging = true;
			group.setAttribute("data-dragging", "");
			changeVolume(e);
			document.addEventListener("pointermove", changeVolume);
			document.addEventListener("pointerup", setDragging);
		} else if (e.type == "pointerup") {
			dragging = false;
			group.removeAttribute("data-dragging");
			document.removeEventListener("pointermove", changeVolume);
			document.removeEventListener("pointerup", setDragging);
			if (!group.hasAttribute("data-hover")) {
				group.removeAttribute("data-active");
			}
		}
	};

	const setGroupFocus = (focus: boolean) => {
		if (focus) {
			group.setAttribute("data-hover", "");
			group.setAttribute("data-active", "");
		} else {
			group.removeAttribute("data-hover");
			if (!active && !dragging) {
				group.removeAttribute("data-active");
			}
		}
	};

	$effect(() => {
		const volume = currentVolume;
		group.style.setProperty("--slider-fill", `${volume}%`);
	});

	onMount(() => {
		group.style.setProperty("--slider-fill", `${currentVolume}%`);
	});
</script>

<div
	bind:this={group}
	onpointerdown={setDragging}
	onpointerenter={() => {
		setGroupFocus(true);
	}}
	onpointerleave={() => {
		setGroupFocus(false);
	}}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={currentVolume}
	class="group relative mx-[7.5px] inline-flex h-10 w-32 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden"
>
	<!-- Track -->
	<div class="relative z-0 h-[5px] w-full rounded-sm bg-white/30 ring-media-focus">
		<div
			class="absolute h-full w-[var(--slider-fill)] rounded-sm bg-white/60 will-change-[width]"
		/>
	</div>
	<SliderThumb />
	<!--
		<SliderPreview noClamp>
			<p class="rounded-sm bg-black px-2 py-px text-[13px] font-medium" />
		</SliderPreview>

	-->
</div>
