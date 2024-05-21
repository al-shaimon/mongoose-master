/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { Product } from './product.model';

// creating product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Validate the product data using Joi
    const { error, value } = productValidationSchema.validate(productData);

    const result = await ProductServices.createProductIntoDB(value);

    if (error) {
      return res.status(400).send({
        success: false,
        message: 'Create data Validation error!',
        error: error.details,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
};

// getting all products controller with search query
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
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

// getting single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

// updating product in database
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // checking if another product with same name exists in database
    const existingProduct = await Product.findOne({
      name: updateData.name,
      _id: { $ne: productId },
    });

    if (existingProduct) {
      return res.status(201).json({
        success: false,
        message: 'Product with same name already exists!',
      });
    }

    const updatedProduct = await ProductServices.updateProductInDB(
      productId,
      updateData,
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
};

// deleting product controller
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
