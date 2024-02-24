import { z } from 'zod';
import mongoose from 'mongoose';
import { zodSchema } from '@zodyac/zod-mongoose';
import type { MongoDefaultType } from '../utils/db';

const { model, models } = mongoose;

export const UserSchema = z.object({
	username: z.string(),
	email: z.string(),
	password: z.string(),
	role: z.enum(['user', 'admin']),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export type User = MongoDefaultType & z.infer<typeof UserSchema>;
export type FrontUser = Omit<User, 'password'>;

const schema = zodSchema(UserSchema);

schema.path('email').unique(true);
schema.path('username').unique(true);

export const UserModel = models.User || model('User', schema);
