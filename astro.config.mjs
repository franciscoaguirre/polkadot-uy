// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://polkadot.uy',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false, // Spanish at root, English at /en
		},
	},
	integrations: [
		react(),
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: {
					es: 'es',
					en: 'en',
				},
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()]
	}
});
