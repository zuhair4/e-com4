import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import NavBar from '../components/NavBar';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const handlePriceRange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product._id !== id));
  };

  const handleEdit = (updatedProduct: Product) => {
    setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  const handleBuyNow = async (product: Product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', { productId: product._id });
      if (response.status === 201) {
        setProducts(products.filter(p => p._id !== product._id));
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="controls">
          <div className="sort-controls">
            <button onClick={() => handleSort('default')} className={sortOrder === 'default' ? 'active' : ''}>Default</button>
            <button onClick={() => handleSort('lowToHigh')} className={sortOrder === 'lowToHigh' ? 'active' : ''}>Price: Low to High</button>
            <button onClick={() => handleSort('highToLow')} className={sortOrder === 'highToLow' ? 'active' : ''}>Price: High to Low</button>
          </div>
          <div className="filter-controls">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="product-list">
          {products
            .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(product => product.price >= minPrice && product.price <= maxPrice)
            .sort((a, b) => {
              if (sortOrder === 'highToLow') {
                return b.price - a.price;
              } else if (sortOrder === 'lowToHigh') {
                return a.price - b.price;
              } else {
                return 0;
              }
            })
            .map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onBuyNow={handleBuyNow}  
                showBuyNowButton={true}

              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
