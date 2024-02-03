import { z, type RouteModifier } from 'sveltekit-api';
import getNames from '$lib/server/spider/getNames';

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Spider'] } : r);

export const Output = z.object({
	names: z.array(z.string())
});

export default async function () {
	const names = await getNames();
	return { names };
}
