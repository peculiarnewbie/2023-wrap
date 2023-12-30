<script lang="ts">
	import { SheetObject, createSheetObjectAction, createTransformer } from "@threlte/theatre";
	import { types } from "@theatre/core";

	const wrapperSheetObject = createSheetObjectAction();
	const videoSheetObject = createSheetObjectAction();

	let scale = 1;
</script>

<div
	use:wrapperSheetObject={{
		key: "Video Wrapper",
		props: {
			translate: { x: 0, y: 0, z: -400 },
			h: 500,
			w: 650,
			rotation: { x: 0, y: 1, z: 0 },
			multiplier: 1
		},
		callback: (node, { translate, h, w, rotation, multiplier }) => {
			node.style.height = `${h * scale}px`;
			node.style.width = `${w * scale}px`;
			node.style.borderRadius = `${4 * scale}rem`;
			node.style.transformOrigin = `${(h * scale) / 2}px ${(w * scale) / 2}px ${-400 * scale}px`;
			node.style.transform = `perspective(2000px)
			translate3d(${translate.x * scale}px, ${translate.y * scale}px, ${translate.z * scale * scale}px)
			rotateX(${rotation.x}deg)
			rotateY(${rotation.y}deg) 
			rotateZ(${rotation.z}deg) `;
			scale = 1 + multiplier * 0.1;
		}
	}}
	class=" origin-center overflow-hidden"
>
	<div
		use:videoSheetObject={{
			key: "Video Transform",
			props: {
				translate: { x: -1020, y: -50 },
				size: { h: 600, w: 1080 }
			},
			callback: (node, { translate, size }) => {
				node.style.height = `${size.h * scale}px`;
				node.style.width = `${size.w * scale}px`;
				node.style.transform = `translate3d(${translate.x * scale}px, ${
					translate.y * scale * scale
				}px, 0)`;
				node.style.rotate;
			}
		}}
		class=" z-20 flex h-[600px] w-[1080px] flex-col"
	>
		<slot />
	</div>
</div>
