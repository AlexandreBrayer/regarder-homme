import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import spawnSpider from '$lib/server/spider/spawnSpider';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) =>
	modifyRoute(r, {
		tags: ['Spider']
	});

const Output = z.object({
	status: z.string()
});

const Input = z.object({
	name: z.string()
});

const Error = pickErrors([500, 401]);

export default new Endpoint({ Input, Output, Modifier, Error }).handle(async (param) => {
	try {
		spawnSpider(param.name);
		return { status: 'success' };
	} catch (error) {
		console.error(`spawnSpider error: ${error}`);
		throw Error[500];
	}
});
