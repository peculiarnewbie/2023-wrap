import { createConfig, defaultConfig } from "@tokenami/dev";

export default createConfig({
	include: ["./src/**/*.{ts,tsx,svelte}"],
	responsive: {},
	theme: {
		color: {
			"red-100": "#222333",
			bolto: "#77aa22",
			boltoh: "#ffff00"
		},
		keyframes: {},
		selectors: {},
		aliases: {}
	},
	properties: {
		...defaultConfig.properties
	}
});
