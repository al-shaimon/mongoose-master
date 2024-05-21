/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Validate the product data using Joi
    const { error, value } = productValidationSchema.validate(productData);

    const result = await ProductServices.createProductIntoDB(value);

    if (error) {
      return res.status(400).send({
        success: false,
        message: 'Something went wrong!',
        error: error.details,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
