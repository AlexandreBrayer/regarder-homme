import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import spawnSpider from '$lib/server/spider/spawnSpider';
import { addTags } from '$lib/server/utils/openApi/modifiers';

const Modifier: RouteModifier = (r) => addTags(r, ['Spider']);

const Output = z.object({
	status: z.string()
});

const Input = z.object({
	name: z.string()
});

export default new Endpoint({ Input, Output, Modifier }).handle(async (param) => {
	try {
		spawnSpider(param.name);
		return { status: 'success' };
	} catch (error) {
		console.error(`spawnSpider error: ${error}`);
		return { status: 'error' };
	}
});
