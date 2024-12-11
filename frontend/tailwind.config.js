/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				custom: ['Poppins', 'sans-serif'],
			},
			gridTemplateColumns: {
				// Adding custom grid template for 13 columns
				13: 'repeat(13, minmax(0, 1fr))',
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-none': {
					'-ms-overflow-style': 'none', // Internet Explorer
					'scrollbar-width': 'none', // Firefox
					'&::-webkit-scrollbar': {
						display: 'none', // Safari and Chrome
					},
				},
			});
		},
	],
};
