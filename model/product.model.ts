import { model, Schema, Model, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProductModel: Model<Product> = model<Product>('Product', ProductSchema);
