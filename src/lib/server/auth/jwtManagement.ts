import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import {
	JWT_EXPIRES_IN,
	JWT_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET
} from '$env/static/private';

export async function createToken(payload: string | object | Buffer): Promise<string> {
	return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function createRefreshToken(payload: string | object | Buffer): Promise<string> {
	return sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export async function verifyToken(token: string): Promise<string | object> {
	return verify(token, JWT_SECRET);
}

export async function verifyRefreshToken(token: string): Promise<string | object> {
    return verify(token, REFRESH_SECRET);
}

export async function refreshToken(token: string): Promise<string> {
    const payload = await verifyRefreshToken(token);
    console.log('payload', payload);
    return createToken(payload);
}
