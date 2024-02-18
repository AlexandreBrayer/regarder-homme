import { z } from 'zod';
import mongoose from 'mongoose';
import { zodSchema } from '@zodyac/zod-mongoose';
import type { MongoDefaultType } from '../utils/db/MongoDefaultType';

const { model, models } = mongoose;

export const ProductSchema = z.object({
	name: z.string(),
	reference: z.string(),
	description: z.string().optional(),
	images: z.array(z.string()).optional(),
	rrp: z.number(),
	price: z.number(),
	currency: z.string(),
	url: z.string().optional(),
	brand: z.string().optional(),
	category: z.string().optional(),
	composition: z.string().optional(),
	color: z.string().optional(),
	gender: z.string().optional(),
	from: z.string(),
	meta: z
		.array(
			z.object({
				key: z.string(),
				value: z.string()
			})
		)
		.optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});
export type Product = MongoDefaultType & z.infer<typeof ProductSchema>;
const schema = zodSchema(ProductSchema).set('timestamps', true);
export const ProductModel = models.Product || model('Product', schema);
