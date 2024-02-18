import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { UserModel } from '$lib/server/models/User';
import { hashPassword } from '$lib/server/auth/hashManagement';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper } from '$lib/server/utils/db/operationWrapper';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Auth'], security: [] });

const Input = z.object({
	username: z.string().min(3).max(20),
	email: z.string(),
	password: z
		.string()
		.min(8)
		.max(100)
		.refine((password) =>
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(password)
		)
});

const Output = z.object({
	status: z.string(),
	message: z.string().optional()
});

const Error = pickErrors([500]);

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
