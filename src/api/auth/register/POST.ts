import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { UserModel } from '$lib/server/models/User';
import { hashPassword } from '$lib/server/auth/hashManagement';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper } from '$lib/server/utils/db';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Auth'] });

const Input = z.object({
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit etre d'au minimum 3 caractères")
		.max(20, "Le nom d'utilisateur doit etre d'au maximum 20 caractères"),
	email: z.string(),
	password: z
		.string()
		.min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
		.max(100, { message: 'Le mot de passe doit contenir au plus 100 caractères.' })
		.refine(
			(password) =>
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(password),
			'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'
		)
});

const Output = z.object({
	status: z.string()
});

const Error = pickErrors([500, 401]);

export default new Endpoint({ Input, Output, Modifier, Error }).handle(async (param) => {
	const password = await hashPassword(param.password);
	try {
		await dbOperationWrapper(async (): Promise<void> => {
			return await UserModel.create({ ...param, password, role: 'user' });
		});
		return { status: 'success' };
	} catch (error) {
		console.error(`register error: ${error}`);
		throw Error[500];
	}
});
