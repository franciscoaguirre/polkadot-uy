// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false, // Spanish at root, English at /en
		},
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()]
	}
});
