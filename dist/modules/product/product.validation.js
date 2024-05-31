"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Joi schema for variant
const variantValidationSchema = joi_1.default.object({
    type: joi_1.default.string().required().messages({
        'string.base': 'Variant type must be a string.',
        'any.required': 'Variant type is required.',
    }),
    value: joi_1.default.string().required().messages({
        'string.base': 'Variant value must be a string.',
        'any.required': 'Please input a valid variant value.',
    }),
});
// Joi schema for inventory
const inventoryValidationSchema = joi_1.default.object({
    quantity: joi_1.default.number().required().messages({
        'number.base': 'Product quantity must be a number.',
        'any.required': 'Product quantity is required.',
    }),
    inStock: joi_1.default.boolean().required().messages({
        'boolean.base': 'Stock status must be a boolean.',
        'any.required': 'Please input valid stock status.',
    }),
});
// Joi schema for product
const productValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.base': 'Product name must be a string.',
        'any.required': 'Product name is required.',
    }),
    description: joi_1.default.string().required().messages({
        'string.base': 'Product description must be a string.',
        'any.required': 'Product description is required.',
    }),
    price: joi_1.default.number().required().messages({
        'number.base': 'Product price must be a number.',
        'any.required': 'Product price is required.',
    }),
    category: joi_1.default.string().required().messages({
        'string.base': 'Product category must be a string.',
        'any.required': 'Product category is required.',
    }),
    tags: joi_1.default.array().items(joi_1.default.string()).required().messages({
        'array.base': 'Product tags must be an array.',
        'any.required': 'Product tags are required.',
    }),
    variants: joi_1.default.array().items(variantValidationSchema).required().messages({
        'array.base': 'Product variants must be an array.',
        'any.required': 'Product variant is required.',
    }),
    inventory: inventoryValidationSchema.required().messages({
        'any.required': 'Product inventory is required.',
    }),
});
exports.default = productValidationSchema;
