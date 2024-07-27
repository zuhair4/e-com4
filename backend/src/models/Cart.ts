import mongoose, { Document, Schema } from 'mongoose';

interface ICartItem extends Document {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String},
  imageUrl: { type: String},
});

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);

export default CartItem;
