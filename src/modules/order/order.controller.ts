/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

// creating order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const { error, value } = orderValidationSchema.validate(orderData);

    const result = await OrderServices.createOrderInDB(value);

    if (error) {
      return res.status(400).send({
        success: false,
        message: 'Create order Validation error!',
        error: error.details,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
};

export const OrderControllers = {
  createOrder,
};
