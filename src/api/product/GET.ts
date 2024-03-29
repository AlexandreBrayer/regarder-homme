import { ProductModel, ProductSchema, type Product } from '$lib/server/models/Product';
import { z, Endpoint, type RouteModifier } from 'sveltekit-api';
import { modifyRoute } from '$lib/server/utils/openApi/modifiers';
import { dbOperationWrapper, documentSerializer } from '$lib/server/utils/db';
import type { Document } from 'mongoose';
import { pickErrors } from '$lib/server/utils/openApi/errors';

const Modifier: RouteModifier = (r) => modifyRoute(r, { tags: ['Product'] });

const Output = z.object({
	products: z.array(ProductSchema)
});

const Error = pickErrors([401]);

export default new Endpoint({ Output, Modifier, Error }).handle(async () => {
	const products = await dbOperationWrapper(async (): Promise<Product[]> => {
		return (await ProductModel.find({})).map((product: Document<Product>) =>
			documentSerializer(product)
		);
	});
	return { products };
});
