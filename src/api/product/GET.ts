import { ProductModel, ProductSchema, type Product } from '$lib/server/models/Product';
import { connectDB, disconnectDB } from '$lib/server/db';
import { z } from 'zod';

export const Output = z.object({
	products: z.array(ProductSchema)
});

export default async function (): Promise<z.infer<typeof Output>> {
	await connectDB();
	const products = (await ProductModel.find({})).map((product) => ({
		...product.toObject(),
		_id: product._id.toString()
	})) as Product[];
	console.log(products);
	await disconnectDB();
	return { products };
}
