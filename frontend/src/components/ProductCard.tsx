import React, { useState } from 'react';
import { Product } from '../types/Product';
import axios from 'axios';
import '../styles/ProductCard.css';
import AddProductForm from './ProductForm';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  onEdit?: (updatedProduct: Product) => void;
  onBuyNow?: (product: Product) => void;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showBuyNowButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit, onBuyNow, showDeleteButton, showEditButton, showBuyNowButton }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      if (onDelete) onDelete(product._id);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = async (updatedProduct: Product) => {
    setIsEditing(false);
    if (onEdit) onEdit(updatedProduct);
  };

  // const handleBuyNow = async (product: Product) => {
  //   console.log("You have successfully got this product");
  // };

  const handleBuyNow = () => {
   if(onBuyNow) onBuyNow(product); 
  };


  return (
    <div className="product-card">
      {isEditing ? (
        <AddProductForm product={product} onSave={handleEdit} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          {showDeleteButton ? <button onClick={handleDelete} className="delete-button">Delete</button> : ""} 
          {showEditButton ? <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button> : ""}
          {showBuyNowButton ? <button onClick={handleBuyNow} className="edit-button">Buy Now</button> : ""}
          
        </>
      )}
    </div>
  );
};

export default ProductCard;
