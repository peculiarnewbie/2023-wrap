const { createConfig } = require("@tokenami/dev");

module.exports = createConfig({
	include: ["./src/**/*.{js,jsx,ts,tsx,svelte}"],
	grid: "0.25rem",
	responsive: {},
	theme: {
		alpha: {},
		anim: {},
		border: {},
		color: {},
		ease: {},
		"font-size": {},
		leading: {},
		"line-style": {},
		radii: {},
		size: {},
		shadow: {},
		surface: {},
		tracking: {},
		transition: {},
		weight: {},
		z: {}
	}
});
