import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { UserModel, type User } from '$lib/server/models/User';
import { dbOperationWrapper } from '$lib/server/utils/db/operationWrapper';
import { refreshToken, verifyRefreshToken } from '$lib/server/auth/jwtManagement';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Auth'], security: [] });

const Input = z.object({
	refreshToken: z.string()
});

const Output = z.object({
	token: z.string(),
	refreshToken: z.string()
});

const Error = pickErrors([401]);

export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (param) => {
	try {
		const verified = (await verifyRefreshToken(param.refreshToken)) as { id: string };
		const user = await dbOperationWrapper(async (): Promise<User | null> => {
			return await UserModel.findById(verified.id);
		});

		if (!user) {
			throw Error[401];
		}
		return await refreshToken({ role: user.role, id: user._id.toString() });
	} catch (error) {
		console.error(`refreshToken error: ${error}`);
		throw Error[401];
	}
});
