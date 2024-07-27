import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string; // Add this line
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }, // Add this line
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
