import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import type { User } from '$lib/server/models/User';

import {
	JWT_EXPIRES_IN,
	JWT_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET
} from '$env/static/private';

export type TokenData = {
	id: string;
	role: User['role'];
};

export type TokenPayload = {
	iat: number;
	exp: number;
} & TokenData;

export async function createToken(payload: TokenData): Promise<string> {
	return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function createRefreshToken(payload: TokenData): Promise<string> {
	return sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export async function verifyToken(token: string): Promise<TokenPayload> {
	return verify(token, JWT_SECRET) as TokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
	return verify(token, REFRESH_SECRET) as TokenPayload;
}

export async function refreshToken(payload: TokenData): Promise<{
	token: string;
	refreshToken: string;
}> {
	const { id, role } = payload;
	return {
		token: await createToken({ id, role }),
		refreshToken: await createRefreshToken({ id, role })
	};
}
