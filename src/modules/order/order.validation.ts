import Joi from 'joi';
import { TOrder } from './order.interface';

const orderValidationSchema = Joi.object<TOrder>({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export default orderValidationSchema;
