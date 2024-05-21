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

// getting all product from database & search query
const getAllProductsFromDB = async (searchTerm?: string) => {
  const query = searchTerm ? { name: new RegExp(searchTerm, 'i') } : {};

  const result = await Product.find(query);

  return result;
};

// getting single product from database
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });

  // const result = await Product.aggregate([{ $match: { id: id } }]);
  return result;
};

// updating single product from database
const updateProductInDB = async (
  productId: string,
  productData: Partial<TProduct>,
  updateInventoryOnly: boolean = false,
) => {
  const update = updateInventoryOnly
    ? {
        'inventory.quantity': productData.inventory?.quantity,
        'inventory.inStock': productData.inventory?.inStock,
      }
    : productData;

  const result = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  });

  return result;
};

// deleting product from database
const deleteProductFromDB = async (productId: string) => {
  await Product.deleteOne({ _id: productId });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
