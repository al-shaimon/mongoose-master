import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const VariantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required.'],
  },
  value: {
    type: String,
    required: [true, 'Please input a valid variant value.'],
  },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true, 'Product quantity is required.'] },
  inStock: {
    type: Boolean,
    required: [true, 'Please input valid stock status.'],
  },
});

const productSchema = new Schema<TProduct, ProductModel>({
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
    type: [VariantSchema],
    required: [true, 'Product variant is required.'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory is required.'],
  },
});

export const Product = model<TProduct, ProductModel>('Product', productSchema);
