/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			mono: [
				"ui-monospace",
				"SF Mono",
				"JetBrains Mono",
				"Courier",
				"monospace",
			],
			sans: ["var(--aspekta)", "sans-serif"],
		},
		extend: {
			cursor: {
				hand: 'url("/pointer.svg") 10 10, auto;',
			},
			animation: {
				floatUp:
					"float-up 400ms ease calc(var(--animation-order) * 100ms) 1 normal both",
				floatUpFast:
					"float-up 400ms ease calc(var(--animation-order) * 60ms) 1 normal both",
			},
			keyframes: {
				"float-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(24px)",
					},
					"100%": {
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [],
};
