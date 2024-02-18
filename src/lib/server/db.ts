import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

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
