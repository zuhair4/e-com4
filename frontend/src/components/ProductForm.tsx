import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductForm.css';

interface AddProductFormProps {
  product?: {
    _id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  onSave?: (product: any) => void;
  onCancel?: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState<number | string>(product ? product.price : 0);
  const [description, setDescription] = useState(product ? product.description : '');
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price: parseFloat(price as string),
      description,
      imageUrl
    };

    try {
      if (product && product._id) {
        const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, productData); //edit product
        if (response.status === 200) {
          setMessage('Product updated successfully');
          onSave && onSave(response.data);
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/products', productData);
        if (response.status === 201) {
          setMessage('Product added successfully');
          setName('');
          setPrice('');
          setDescription('');
          setImageUrl('');
          onSave && onSave(response.data);
          window.location.reload();
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setMessage('Error saving product');
    }
  };

  return (
    <div className="add-product-form">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            id='price'
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='image-url'>Image URL</label>
          <input
            id='image-url'
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        {message && <p className='message'>{message}</p>}
      </form>
    </div>
  );
};

export default AddProductForm;
