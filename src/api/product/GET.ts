import { ProductModel, ProductSchema, type Product } from '$lib/server/models/Product';
import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper, documentSerializer } from '$lib/server/utils/db/operationWrapper';
import type { Document } from 'mongoose';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Product'] });

const Output = z.object({
	products: z.array(ProductSchema)
});

export default new Endpoint({ Output, Modifier }).handle(async () => {
	const products = await dbOperationWrapper(async (): Promise<Product[]> => {
		return (await ProductModel.find({})).map((product: Document<Product>) =>
			documentSerializer(product)
		);
	});
	return { products };
});
