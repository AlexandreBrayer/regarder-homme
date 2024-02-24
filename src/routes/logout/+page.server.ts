import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { fail, redirect } from '@sveltejs/kit';

const schema = z.object({});

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));
		cookies.set('token', '', {
			path: '/',
			sameSite: 'lax',
			secure: false,
			httpOnly: true
		});
		cookies.set('refreshToken', '', {
			path: '/',
			sameSite: 'lax',
			secure: false,
			httpOnly: true
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		redirect(302, '/login');
	}
};
