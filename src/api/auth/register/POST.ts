import { z, type RouteModifier } from 'sveltekit-api';
import { UserModel } from '$lib/server/models/User';
import { hashPassword } from '$lib/server/auth/hashManagement';
import { addTags } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper } from '$lib/server/utils/db/operationWrapper';


export const Modifier: RouteModifier = (r) => addTags(r, ['Auth']);

export const Input = z.object({
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

export const Output = z.object({
	status: z.string(),
	message: z.string().optional()
});

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>> {
	const password = await hashPassword(input.password);
	try {
		await dbOperationWrapper(async (): Promise<void> => {
			return (await UserModel.create({ ...input, password, role: 'user' }))
		})
		return { status: 'success' };
	} catch (error) {
		console.error(`register error: ${error}`);
		return { status: 'error', message: (error as Error).message ?? 'Unknown error' };
	}
}
