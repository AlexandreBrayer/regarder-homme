import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'@zodyac/zod-mongoose': 'node_modules/@zodyac/zod-mongoose/dist/index.js'
		}
	}
});
