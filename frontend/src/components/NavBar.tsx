import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/add-product" className="nav-link">Add Product</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Logout</Link>
      </div>
    </nav>
  );
};

export default NavBar;
