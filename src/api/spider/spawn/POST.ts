import { z, type RouteModifier } from 'sveltekit-api';
import spawnSpider from '$lib/server/spider/spawnSpider';

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Spider'] } : r);

export const Output = z.object({
	status: z.string()
});

export const Input = z.object({
	name: z.string()
});

export default async function () {
	const name = 'test';
	try {
		spawnSpider(name);
		return { status: 'success' };
	} catch (error) {
		console.error(`spawnSpider error: ${error}`);
		return { status: 'error' };
	}
}
