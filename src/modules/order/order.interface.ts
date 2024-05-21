import { Model } from 'mongoose';

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type OrderModel = Model<TOrder>;
