import { ProductServices } from '../product/product.service';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// creating order in database
const createOrderInDB = async (orderData: TOrder) => {
  const product = await ProductServices.getSingleProductFromDB(
    orderData.productId,
  );

  if (!product) {
    throw new Error('Order failed. Product not found in inventory');
  } else if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const updatedQuantity = product.inventory.quantity - orderData.quantity;

  // updating inventory
  await ProductServices.updateProductInDB(
    orderData.productId,
    {
      inventory: {
        quantity: updatedQuantity,
        inStock: updatedQuantity > 0,
      },
    },
    true,
  );

  const result = await Order.create(orderData);
  return result;
};

// getting all orders from database
const getAllOrdersFromDB = async () => {
  const result = await Order.find({});

  return result;
};
export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
