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

// getting all orders controller with email search query
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await OrderServices.getAllOrdersFromDB(email as string);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
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
  getAllOrders,
};
