import { verifyToken } from '$lib/server/auth/jwtManagement';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

enum UnprotectedRoutes {
	ApiLogin = '/api/auth/login',
	ApiRefresh = '/api/auth/refresh',
	Login = '/login',
	Docs = '/docs',
	Def = '/def'
}

function getTokenFromEventHeaders(event: RequestEvent) {
	const headers = event.request.headers;
	return headers.get('Authorization')?.split('Bearer ')[1];
}

function getTokenFromEventCookies(event: RequestEvent) {
	return event.cookies.get('token');
}

async function handleProtectedApiRoutes(event: RequestEvent) {
	const token = getTokenFromEventHeaders(event);
	if (!token) {
		throw new Error('Unauthorized');
	}
	await verifyToken(token);
}

async function handleProtectedRoutes(event: RequestEvent) {
	const token = getTokenFromEventCookies(event);
	if (!token) {
		throw new Error('Unauthorized');
	}
	await verifyToken(token);
}

export async function handle({ event, resolve }) {
	if (Object.values(UnprotectedRoutes).includes(event.url.pathname as UnprotectedRoutes)) {
		if (event.url.pathname === UnprotectedRoutes.Login)  {
			try {
				await handleProtectedRoutes(event);
			} catch (error) {
				return await resolve(event);
			}
			return redirect(302, '/');
		}
		return await resolve(event);
	}
	if (event.url.pathname.startsWith('/api')) {
		try {
			await handleProtectedApiRoutes(event);
			return await resolve(event);
		} catch (error) {
			return new Response('Unauthorized', { status: 401 });
		}
	}
	try {
		await handleProtectedRoutes(event);
	} catch (error) {
		return redirect(302, UnprotectedRoutes.Login);
	}
	return await resolve(event);
}
