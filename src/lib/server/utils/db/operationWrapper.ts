import { connectDB, disconnectDB } from '$lib/server/db';
import type { Document } from 'mongoose';

export async function dbOperationWrapper<T>(operation: () => Promise<T>) {
	await connectDB();
	const result = await operation();
	await disconnectDB();
	return result;
}

export function documentSerializer<T extends Document>(document: T) {
	return {
		...document.toObject(),
		_id: document._id.toString()
	};
}
