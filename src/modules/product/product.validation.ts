import { z } from 'zod';

const VariantValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required.'),
  value: z.string().min(1, 'Please input a valid variant value.'),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().nonnegative('Product quantity is required.'),
  inStock: z
    .boolean()
    .refine((value) => value !== undefined, 'Please input valid stock status.'),
});

const ProductValidationSchema = z.object({
  name: z.string().min(1, 'Product name is required.'),
  description: z.string().min(1, 'Product description is required.'),
  price: z.number().nonnegative('Product price is required.'),
  category: z.string().min(1, 'Product category is required.'),
  tags: z.array(z.string()).min(1, 'Product tags are required.'),
  variants: z
    .array(VariantValidationSchema)
    .min(1, 'Product variant is required.'),
  inventory: InventoryValidationSchema.refine(
    (data) => data !== undefined,
    'Product inventory is required.',
  ),
});

export default ProductValidationSchema;
