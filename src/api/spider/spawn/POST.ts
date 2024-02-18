import { z, type RouteModifier } from 'sveltekit-api';
import spawnSpider from '$lib/server/spider/spawnSpider';
import { addTags } from '$lib/server/utils/openApi/modifiers';

export const Modifier: RouteModifier = (r) => addTags(r, ['Spider']);

export const Output = z.object({
	status: z.string()
});

export const Input = z.object({
	name: z.string()
});

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>> {
	try {
		spawnSpider(input.name);
		return { status: 'success' };
	} catch (error) {
		console.error(`spawnSpider error: ${error}`);
		return { status: 'error' };
	}
}
