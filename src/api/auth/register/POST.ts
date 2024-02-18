import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { UserModel } from '$lib/server/models/User';
import { hashPassword } from '$lib/server/auth/hashManagement';
import { addTags } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper } from '$lib/server/utils/db/operationWrapper';

const Modifier: RouteModifier = (r) => addTags(r, ['Auth']);

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

export default new Endpoint({ Input, Output, Modifier }).handle(async (param) => {
	const password = await hashPassword(param.password);
	try {
		await dbOperationWrapper(async (): Promise<void> => {
			return await UserModel.create({ ...param, password, role: 'user' });
		});
		return { status: 'success' };
	} catch (error) {
		console.error(`register error: ${error}`);
		return { status: 'error', message: (error as Error).message ?? 'Unknown error' };
	}
});
