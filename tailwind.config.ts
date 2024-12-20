import type { Config } from 'tailwindcss';

export default {
	content: ['./app/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'var(--font-sans)',
			},
			colors: {
				text: 'hsl(42, 43%, 9%)',
				background: 'hsl(44, 61%, 93%)',
				primary: 'hsl(45, 99%, 55%)',
				secondary: 'hsl(42, 64%, 70%)',
				accent: 'hsl(278, 43%, 40%)',
			},
		},
	},
	plugins: [],
} satisfies Config;
