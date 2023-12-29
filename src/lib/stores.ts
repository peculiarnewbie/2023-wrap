import { writable } from "svelte/store";

export const tvPosition = writable<[x: number, y: number, z: number]>([0, 0, 0]);

export const tvRotation = writable<[x: number, y: number, z: number]>([0, 0, 0]);

export const tvScale = writable<[x: number, y: number, z: number]>([1, 1, 1]);
