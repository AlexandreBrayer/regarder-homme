import { z, type RouteModifier } from 'sveltekit-api';
import spawnSpider from '$lib/server/spider/spawnSpider';

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Spider'] } : r);

export const Output = z.object({
	status: z.string()
});

export const Input = z.object({
	name: z.string()
});

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>>{
	try {
		spawnSpider(input.name);
		return { status: 'success' };
	} catch (error) {
		console.error(`spawnSpider error: ${error}`);
		return { status: 'error' };
	}
}
