import { writable } from "svelte/store";

export const tvPosition = writable<[x: number, y: number, z: number]>([0, 0, 0]);

export const tvRotation = writable<[x: number, y: number, z: number]>([0, 0, 0]);

export const tvScale = writable<[x: number, y: number, z: number]>([1, 1, 1]);

export type cameraTransform = {
	position: { x: number; y: number; z: number };
	lookAt: { x: number; y: number };
};

export const tvCamera = writable<cameraTransform>({
	position: { x: 0, y: -1, z: 5 },
	lookAt: { x: 0, y: 0 }
});
