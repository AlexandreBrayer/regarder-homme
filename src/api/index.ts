import { API } from 'sveltekit-api';
import { BASE_URL } from '$env/static/private';

export default new API(import.meta.glob('./**/*.ts'), {
	openapi: '3.0.0',
	servers: [
		{
			url: BASE_URL || 'http://localhost:5173'
		}
	],
	info: {
		title: 'WatchMan API',
		version: '1.0.0',
		description: 'WatchMan API'
	}
});
