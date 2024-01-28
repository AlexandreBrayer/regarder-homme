import type { PageServerLoad } from './$types';
import { connectDB, disconnectDB } from '$lib/server/db';
import { ProductModel } from '$lib/server/models/Product';

export const load = (async () => {
	// await connectDB();
    // const dummyProduct = {
    //     name: 'dummy',
    //     reference: 'dummy',
    //     description: 'dummy',
    //     images: ['dummy'],
    //     rrp: 1,
    //     price: 1,
    //     currency: 'dummy',
    //     url: 'dummy',
    //     brand: 'dummy',
    //     category: 'dummy',
    //     composition: 'dummy',
    //     color: 'dummy',
    //     gender: 'dummy',
    //     meta: [{key: 'dummy', value: 'dummy'}],
    // }
    // const product = new ProductModel(dummyProduct);
    // await product.save();
    // const products = await ProductModel.find({});
    // console.log(products);
	// await disconnectDB();
	return {};
}) satisfies PageServerLoad;
