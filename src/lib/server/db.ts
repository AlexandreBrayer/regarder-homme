import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export const disconnectDB = async () => {
	try {
		await mongoose.connection.close();
		console.log('MongoDB Disconnected...');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
