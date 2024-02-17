import { z, type RouteModifier } from 'sveltekit-api';
import { UserModel } from '$lib/server/models/User';
import { connectDB, disconnectDB } from '$lib/server/db';
import bcrypt from 'bcryptjs';

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Auth'] } : r);

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
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const password = await bcrypt.hash(input.password, salt);
	try {
		await connectDB();
		await UserModel.create({ ...input, password, role: 'user' });
		await disconnectDB();
		return { status: 'success' };
	} catch (error) {
		console.error(`register error: ${error}`);
		return { status: 'error', message: (error as Error).message ?? 'Unknown error' };
	}
}
