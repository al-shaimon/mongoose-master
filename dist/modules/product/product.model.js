"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Variant type is required.'],
    },
    value: {
        type: String,
        required: [true, 'Please input a valid variant value.'],
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: [true, 'Product quantity is required.'] },
    inStock: {
        type: Boolean,
        required: [true, 'Please input valid stock status.'],
    },
});
// product schema
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required.'],
    },
    tags: {
        type: [String],
        required: [true, 'Product tags are required.'],
    },
    variants: {
        type: [variantSchema],
        required: [true, 'Product variant is required.'],
    },
    inventory: {
        type: inventorySchema,
        required: [true, 'Product inventory is required.'],
    },
});
// creating a static method to the model
productSchema.statics.isProductExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findOne({ name });
        return existingProduct;
    });
};
exports.Product = (0, mongoose_1.model)('Product', productSchema);
