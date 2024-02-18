import type { RouteConfig } from 'sveltekit-api';

export function modifyRoute(route: RouteConfig, modifier: Record<string, unknown>): RouteConfig {
	return { ...route, ...modifier };
}
