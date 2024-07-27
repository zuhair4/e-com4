import { Request, Response } from 'express';
import CartItem from '../models/Cart';
import Product from '../models/Products';
import mongoose from 'mongoose';

const handleError = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unknown error occurred';
};

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: handleError(err) });
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newCartItem = new CartItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
    });

    await newCartItem.save();
    await product.deleteOne();  // Delete product from products collection

    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ message: handleError(err) });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid cart item ID' });
    }
    const cartItem = await CartItem.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const newProduct = new Product({
      _id: cartItem.productId,
      name: cartItem.name,
      price: cartItem.price,
      description: cartItem.description,
      imageUrl: cartItem.imageUrl,
    });

    await newProduct.save();  // Add product back to products collection

    res.status(200).json({ message: 'Cart item removed and product added back to dashboard' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing cart item', error: err });
  }
};
