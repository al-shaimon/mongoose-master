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

// getting single product from database
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });

  // const result = await Product.aggregate([{ $match: { id: id } }]);
  return result;
};

// updating single product from database
const updateProductInDB = async (productId: string, productData: TProduct) => {
  return Product.findByIdAndUpdate(productId, productData, { new: true });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
};
