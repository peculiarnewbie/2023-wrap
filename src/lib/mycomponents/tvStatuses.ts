export const StateEnums = {
	preStart: -1,
	start: 0,
	transition: 1,
	paused: 99
} as const;

export type StateKeys = (typeof StateEnums)[keyof typeof StateEnums];
