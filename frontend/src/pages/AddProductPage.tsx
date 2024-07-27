import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import Navbar from '../components/NavBar';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
// import '../styles/AddProductPage.css';

const AddProductPage: React.FC = () => {

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product._id !== id));
  };
  
  const handleEdit = (updatedProduct: Product) => {
    setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  return (
    <div>
      <Navbar />
      <div className="add-product-page-container">
        <ProductForm />
      </div>

      <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} showDeleteButton={true} showEditButton={true} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
    </div>
  );
};

export default AddProductPage;
