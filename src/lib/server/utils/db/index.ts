import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';
import type { Document } from 'mongoose';

export type MongoDefaultType = {
	_id: string;
	__v: number;
	createdAt: Date;
	updatedAt: Date;
};

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URL);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export const disconnectDB = async () => {
	try {
		await mongoose.connection.close();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export async function dbOperationWrapper<T>(operation: () => Promise<T>) {
	await connectDB();
	const result = await operation();
	await disconnectDB();
	return result;
}

export function documentSerializer<T extends Document>(document: T) {
	const serializedDocument = {
		...document.toObject(),
		_id: document._id.toString()
	};

	delete serializedDocument.__v;

	return serializedDocument;
}
