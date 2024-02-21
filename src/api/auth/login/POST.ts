import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { UserModel, type User } from '$lib/server/models/User';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { comparePassword } from '$lib/server/auth/hashManagement';
import { dbOperationWrapper } from '$lib/server/utils/db';
import { createToken, createRefreshToken } from '$lib/server/auth/jwtManagement';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Auth'], security: [] });

const Input = z.object({
	username: z.string(),
	password: z.string()
});

const Output = z.object({
	token: z.string(),
	refreshToken: z.string()
});

const Error = pickErrors([401]);

export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (param) => {
	const user = await dbOperationWrapper(async (): Promise<User | null> => {
		return await UserModel.findOne({ username: param.username });
	});
	if (!user) {
		throw Error[401];
	}
	if (!(await comparePassword(param.password, user.password))) {
		throw Error[401];
	}
	return {
		token: await createToken({ role: user.role, id: user._id }),
		refreshToken: await createRefreshToken({ role: user.role, id: user._id })
	};
});
