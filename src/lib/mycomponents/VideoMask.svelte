<script lang="ts">
	import { SheetObject, createSheetObjectAction, createTransformer } from "@threlte/theatre";
	import { types } from "@theatre/core";

	const wrapperSheetObject = createSheetObjectAction();
	const videoSheetObject = createSheetObjectAction();

	let scale = 1;

	const scaleTransformer = createTransformer({
		transform(value) {
			return types.number(value, {
				range: [0, 10]
			});
		},
		apply(target, path, value) {
			target[path] = value;
		}
	});
</script>

<div
	use:wrapperSheetObject={{
		key: "Video Wrapper",
		props: {
			translate: { x: 0, y: 0, z: 0 },
			h: 500,
			w: 650,
			rotation: { x: 0.2, y: 1, z: 0, r: -16 },
			multiplier: 1
		},
		callback: (node, { translate, h, w, rotation, multiplier }) => {
			node.style.height = `${h * scale}px`;
			node.style.width = `${w * scale}px`;
			node.style.transform = `perspective(2000px) rotate3d(${rotation.x}, ${rotation.y}, ${
				rotation.z
			}, ${rotation.r}deg) translate3d(${translate.x * scale * scale}px, ${
				translate.y * scale * scale
			}px, 0)`;
			scale = 1 + multiplier * 0.1;
		}
	}}
	class=" h-[600px] w-[750px] overflow-hidden"
	style={`border-radius: 4rem;`}
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
			}
		}}
		class=" z-20 flex h-[600px] w-[1080px] flex-col"
	>
		<slot />
	</div>
</div>
