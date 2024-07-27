import { Request, Response } from 'express';
import Product from '../models/Products';
import mongoose from 'mongoose';

const handleError = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unknown error occurred';
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: handleError(err) });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: handleError(err) });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const newProduct = new Product({ name, price, description, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: handleError(err) });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: handleError(err) });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  console.log('Delete request received for ID:', req.params.id); // Log ID
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      console.log('Product not found for ID:', id); // Log if not found
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted successfully:', product); // Log success
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err); // Log error
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};
