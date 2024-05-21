import { TProduct } from './product.interface';
import { Product } from './product.model';

// creating product into database
const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error('Product already exists');
  }

  const result = await Product.create(productData);

  return result;
};

// getting all product from database
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
