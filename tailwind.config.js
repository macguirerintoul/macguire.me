/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			mono: [
				"var(--font-geist-mono)",
				"ui-monospace",
				"SF Mono",
				"JetBrains Mono",
				"Courier",
				"monospace",
			],
			sans: ["var(--font-geist-sans)", "sans-serif"],
		},
		extend: {
			cursor: {
				hand: 'url("/pointer.svg") 10 10, auto;',
			},
			animation: {
				scroll: "scroll 60s linear infinite",
				floatUpSingle: "float-up 1000ms ease",
				floatUpSlow:
					"float-up-blur 2000ms ease calc(var(--animation-order) * 400ms) 1 normal both",
				floatUp:
					"float-up 400ms ease calc(var(--animation-order) * 100ms) 1 normal both",
				floatUpFast:
					"float-up 400ms ease calc(var(--animation-order) * 60ms) 1 normal both",
				nav: "nav 2000ms ease calc(var(--animation-order) * 400ms) 1 normal both",
			},
			keyframes: {
				scroll: {
					"0%": {
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(calc(-100% - var(--logo-gap)))",
					},
				},
				nav: {
					"0%": {
						opacity: "0",
						filter: "blur(8px)",
					},
					"100%": {
						opacity: "1",
					},
				},
				"float-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(24px)",
					},
					"100%": {
						opacity: "1",
					},
				},
				"float-up-blur": {
					"0%": {
						opacity: "0",
						transform: "translateY(24px) scale(0.99)",
						filter: "blur(8px)",
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
