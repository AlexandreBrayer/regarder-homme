import type { LayoutServerLoad } from './$types';
import type { UserContext } from '$lib/stores/session';

export const load = (async ({ locals }) => {
	return { user: (locals as { user: UserContext }).user };
}) satisfies LayoutServerLoad;
