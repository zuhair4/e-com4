import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem } from '../types/CartItem';
import '../styles/Cart.css';
import NavBar from './NavBar';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      fetchCartItems();  // Fetch cart items again after removal
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  return (
    <div>
     <NavBar />
      <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">${item.price}</p>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  
  );
};

export default Cart;
