import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import getNames from '$lib/server/spider/getNames';
import { addTags } from '$lib/server/utils/openApi/modifiers';

const Modifier: RouteModifier = (r) => addTags(r, ['Spider']);

const Output = z.object({
	names: z.array(z.string())
});

export default new Endpoint({ Output, Modifier }).handle(async () => {
	const names = await getNames();
	return { names };
});
