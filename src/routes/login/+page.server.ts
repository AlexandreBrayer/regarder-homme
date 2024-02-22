import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

const loginFormValidator = z.object({
	username: z.string(),
	password: z.string()
});

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const form = await superValidate(request, zod(loginFormValidator));

		if (!form.valid) {
			return fail(400, { form });
		}
		const { username, password } = form.data;
		const loginResponse = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		if (loginResponse.status === 401) {
			form.errors = { username: ["Nom d'utilisateur ou mot de passe incorrect"] };
			return fail(401, { form });
		}
		const { token, refreshToken } = await loginResponse.json();
		cookies.set('token', token, {
			path: '/',
			sameSite: 'lax',
			//  secure: true,
			httpOnly: true
		});
		cookies.set('refreshToken', refreshToken, {
			path: '/',
			sameSite: 'lax',
			// secure: true,
			httpOnly: true
		});
		redirect(302, '/');
		return { form };
	}
};

export const load = async () => {
	const form = await superValidate(zod(loginFormValidator));
	return { form };
};
