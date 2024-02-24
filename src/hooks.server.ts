import { verifyToken } from '$lib/server/auth/jwtManagement';
import type { RequestEvent, ResolveOptions, MaybePromise } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { dbOperationWrapper, documentSerializer } from '$lib/server/utils/db';
import { UserModel, type User } from '$lib/server/models/User';
import type { Document } from 'mongoose';

enum UnprotectedRoutes {
	ApiLogin = '/api/auth/login',
	ApiRefresh = '/api/auth/refresh',
	Login = '/login',
	Docs = '/docs',
	Def = '/def'
}

async function getUserById(id: string) {
	return dbOperationWrapper(async () => {
		const user = (await UserModel.findById(id).select('-password')) as Document<User> | null;
		if (!user) {
			return null;
		}
		return documentSerializer(user);
	});
}

function getTokenFromEventHeaders(event: RequestEvent) {
	const headers = event.request.headers;
	return headers.get('Authorization')?.split('Bearer ')[1];
}

function getTokenFromEventCookies(event: RequestEvent) {
	return event.cookies.get('token');
}

async function handleProtectedApiRoutes(
	event: RequestEvent,
	resolve: (event: RequestEvent, opts?: ResolveOptions) => MaybePromise<Response>
) {
	const token = getTokenFromEventHeaders(event);
	if (!token) {
		return new Response('Unauthorized', { status: 401 });
	}
	const tokenPayload = await verifyToken(token);
	const userId = tokenPayload.id;
	const user = await getUserById(userId);
	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}
	return await resolve(event);
}

async function handleProtectedRoutes(
	event: RequestEvent,
	resolve: (event: RequestEvent, opts?: ResolveOptions) => MaybePromise<Response>
) {
	const token = getTokenFromEventCookies(event);
	if (!token) {
		return redirect(302, UnprotectedRoutes.Login);
	}
	const tokenPayload = await verifyToken(token);
	const userId = tokenPayload.id;
	const user = await getUserById(userId);
	if (!user) {
		return redirect(302, UnprotectedRoutes.Login);
	}
	return await resolve({ ...event, locals: { user } });
}

async function handleUnprotectedRoutes(
	event: RequestEvent,
	resolve: (event: RequestEvent, opts?: ResolveOptions) => MaybePromise<Response>
) {
	const token = getTokenFromEventCookies(event);
		if (token) {
			try {
				const tokenPayload = await verifyToken(token);
				const userId = tokenPayload.id;
				const user = await getUserById(userId);
				if (user) {
					return await resolve({ ...event, locals: { user } });
				}
			} catch (err) {
				return await resolve(event);
			}
		}
	return await resolve(event);
}

export async function handle({ event, resolve }) {
	if (Object.values(UnprotectedRoutes).includes(event.url.pathname as UnprotectedRoutes)) {
		return await handleUnprotectedRoutes(event, resolve);
	}
	if (event.url.pathname.startsWith('/api')) {
		return await handleProtectedApiRoutes(event, resolve);
	}
	return await handleProtectedRoutes(event, resolve);
}
