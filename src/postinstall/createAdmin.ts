import mongoose from 'mongoose';
import { config } from 'dotenv';
import { UserModel } from '../lib/server/models/User';
import { hashPassword } from '../lib/server/auth/hashManagement';

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const disconnectDB = async () => {
	try {
		await mongoose.connection.close();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

function generatePassword() {
	const length = parseInt(process.env.ADMIN_PASSWORD_LENGTH ?? '24');
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
	let password = '';
	let satisfyConditions = false;

	while (!satisfyConditions) {
		password = Array(length)
			.fill(chars)
			.map(function (x) {
				return x[Math.floor(Math.random() * x.length)];
			})
			.join('');
		satisfyConditions =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(password);
	}

	return password;
}

function giveCredentials(username: string, password: string) {
	console.log(`Username: ${username}\nPassword: ${password}`);
	console.log('Please save these credentials in a safe place ;)');
}

async function createAdmin() {
	const adminUsername = process.env.ADMIN_USERNAME;
	const adminEmail = process.env.ADMIN_EMAIL;
	const rawPassword = generatePassword();
	const adminPassword = await hashPassword(rawPassword);
	await connectDB();
	const admin = await UserModel.findOne({ username: adminUsername });
	if (admin) {
		console.log('Admin already exists, skipping creation.');
		await disconnectDB();
		return;
	}
	await UserModel.create({
		username: adminUsername,
		password: adminPassword,
		role: 'admin',
		email: adminEmail
	});
	giveCredentials(adminUsername!, rawPassword);
	await disconnectDB();
}

config();
createAdmin();
