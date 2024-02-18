import { z, type RouteModifier } from 'sveltekit-api';
import getNames from '$lib/server/spider/getNames';
import { addTags } from '$lib/server/utils/openApi/modifiers';

export const Modifier: RouteModifier = (r) => addTags(r, ['Spider']);

export const Output = z.object({
	names: z.array(z.string())
});

export default async function (): Promise<z.infer<typeof Output>> {
	const names = await getNames();
	return { names };
}
