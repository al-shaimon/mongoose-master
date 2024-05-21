import Joi from 'joi';

// Joi schema for variant
const variantValidationSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.base': 'Variant type must be a string.',
    'any.required': 'Variant type is required.',
  }),
  value: Joi.string().required().messages({
    'string.base': 'Variant value must be a string.',
    'any.required': 'Please input a valid variant value.',
  }),
});

// Joi schema for inventory
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required().messages({
    'number.base': 'Product quantity must be a number.',
    'any.required': 'Product quantity is required.',
  }),
  inStock: Joi.boolean().required().messages({
    'boolean.base': 'Stock status must be a boolean.',
    'any.required': 'Please input valid stock status.',
  }),
});

// Joi schema for product
const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Product name must be a string.',
    'any.required': 'Product name is required.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Product description must be a string.',
    'any.required': 'Product description is required.',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Product price must be a number.',
    'any.required': 'Product price is required.',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Product category must be a string.',
    'any.required': 'Product category is required.',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Product tags must be an array.',
    'any.required': 'Product tags are required.',
  }),
  variants: Joi.array().items(variantValidationSchema).required().messages({
    'array.base': 'Product variants must be an array.',
    'any.required': 'Product variant is required.',
  }),
  inventory: inventoryValidationSchema.required().messages({
    'any.required': 'Product inventory is required.',
  }),
});

export default productValidationSchema;
