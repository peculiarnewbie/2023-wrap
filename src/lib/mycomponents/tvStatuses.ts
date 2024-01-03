export const StateEnums = {
	preStart: -1,
	start: 0,
	transition: 1
} as const;

export type StateKeys = (typeof StateEnums)[keyof typeof StateEnums];
