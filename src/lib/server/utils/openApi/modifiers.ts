import type { RouteConfig } from 'sveltekit-api';

export function addTags(route: RouteConfig, tags: string[]): RouteConfig {
	return { ...route, tags: tags };
}
