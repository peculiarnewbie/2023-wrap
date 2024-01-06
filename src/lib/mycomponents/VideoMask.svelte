<script context="module" lang="ts">
	export let handleResize: (w: number, h: number) => void;
</script>

<script lang="ts">
	import { createSheetObjectAction } from "@threlte/theatre";
	import { onMount } from "svelte";
	import { tvCamera } from "$lib/stores";

	const wrapperSheetObject = createSheetObjectAction();
	const videoSheetObject = createSheetObjectAction();

	let scale = 1;

	let videoH = 360;
	let videoW = 484;

	const resizeVideo = (w: number, h: number) => {
		console.log(w, h);
		scale = h / 1113;
	};

	onMount(() => {
		handleResize = resizeVideo;
	});
</script>

<div class=" relative flex h-full w-full justify-center">
	<div
		use:wrapperSheetObject={{
			key: "Video Wrapper",
			props: {
				translate: { x: 0, y: 0, z: -400 },
				h: 500,
				w: 650,
				rotation: { x: 0, y: 1, z: 0 },
				opacity: 1
			},
			callback: (node, { translate, h, w, rotation, opacity }) => {
				node.style.height = `${h * scale}px`;
				node.style.width = `${w * scale}px`;
				videoH = h * scale;
				videoW = w * scale;
				node.style.borderRadius = `${4 * scale}rem`;
				node.style.transformOrigin = `${(w * scale) / 2}px ${(h * scale) / 2}px ${
					translate.z * scale
				}px`;
				node.style.transform = `perspective(${2000 * scale}px)
					translate3d(${translate.x * scale}px, ${translate.y * scale}px, ${translate.z * scale * scale}px)
					rotateX(${rotation.x}deg)
					rotateY(${rotation.y}deg) 
					rotateZ(${rotation.z}deg) `;
				node.style.opacity = `${opacity}`;
			}
		}}
		class="fixed top-[31vh] flex origin-center justify-center overflow-hidden"
	>
		<div
			use:videoSheetObject={{
				key: "Video Transform",
				props: {
					translate: { x: -1020, y: -50 },
					size: { h: 600, w: 1080 }
				},
				callback: (node, { translate, size }) => {
					// node.style.height = `${size.h * scale}px`;
					// node.style.width = `${size.w * scale}px`;
					node.style.transform = `translate3d(${translate.x * scale}px, ${
						translate.y * scale
					}px, 0)`;
				}
			}}
			class=" px-1/2 fixed z-20 m-auto flex aspect-video flex-col"
			style={` height: ${videoH}px;`}
		>
			<slot />
		</div>
	</div>
</div>
