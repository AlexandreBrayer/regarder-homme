import { z, Endpoint, error, type RouteModifier } from 'sveltekit-api';
import { UserModel, type User } from '$lib/server/models/User';
import { addTags } from '$lib/server/utils/openApi/modifiers';
import { comparePassword } from '$lib/server/auth/hashManagement';
import { dbOperationWrapper } from '$lib/server/utils/db/operationWrapper';
import { createToken, createRefreshToken } from '$lib/server/auth/jwtManagement';

const Modifier: RouteModifier = (r) => addTags(r, ['Auth']);

const Input = z.object({
	username: z.string(),
	password: z.string()
});

const Output = z.object({
	token: z.string(),
	refreshToken: z.string()
});

const Error = {
	403: error(403, 'Forbidden')
};

export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (param) => {
	const user = await dbOperationWrapper(async (): Promise<User | null> => {
		return await UserModel.findOne({ username: param.username });
	});
	if (!user) {
		throw Error[403];
	}
	if (!(await comparePassword(param.password, user.password))) {
		throw Error[403];
	}
	return {
		token: await createToken({ role: user.role, id: user._id }),
		refreshToken: await createRefreshToken({ role: user.role, id: user._id })
	};
});
