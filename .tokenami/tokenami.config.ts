const { createConfig } = require("@tokenami/dev");

module.exports = createConfig({
	// ...
	responsive: {
		medium: "@media (min-width: 700px)",
		large: "@media (min-width: 1024px)"
	},
	theme: {
		color: {
			"slate-100": "#f1f5f9",
			"slate-700": "#334155",
			"sky-500": "#0ea5e9"
		},
		radii: {
			rounded: "10px",
			circle: "9999px",
			none: "none"
		}
	}
});
