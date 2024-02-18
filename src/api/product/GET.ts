import { ProductModel, ProductSchema, type Product } from '$lib/server/models/Product';
import { z, type RouteModifier } from 'sveltekit-api';
import { addTags } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper, documentSerializer } from '$lib/server/utils/db/operationWrapper';
import type { Document } from 'mongoose';

export const Modifier: RouteModifier = (r) => addTags(r, ['Product']);

export const Output = z.object({
	products: z.array(ProductSchema)
});

export default async function (): Promise<{ products: Product[] }> {
	const products = await dbOperationWrapper(async (): Promise<Product[]> => {
		return (await ProductModel.find({})).map((product: Document<Product>) =>
			documentSerializer(product)
		);
	});
	return { products };
}
