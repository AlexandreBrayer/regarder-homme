import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import getNames from '$lib/server/spider/getNames';
import { addTags } from '$lib/server/utils/openApi/modifiers';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => addTags(r, ['Spider']);

const Output = z.object({
	names: z.array(z.string())
});

const Error = pickErrors([500]);

export default new Endpoint({ Output, Modifier, Error }).handle(async () => {
	try {
		const names = await getNames();
		return { names };
	} catch (error) {
		console.error(`getNames error: ${error}`);
		throw Error[500];
	}
});
