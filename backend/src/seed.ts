import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Products';

dotenv.config();

const seedProducts = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || '';
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(mongoURI);

    // Sample data
    const products = [
      {
        name: 'Apple iPhone 14',
        price: 999.99,
        description: 'Latest Apple iPhone with 128GB storage',
      },
      {
        name: 'Samsung Galaxy S23',
        price: 899.99,
        description: 'Latest Samsung Galaxy with 256GB storage',
      },
      {
        name: 'Sony WH-1000XM4',
        price: 349.99,
        description: 'Wireless Noise Cancelling Headphones',
      },
      {
        name: 'Apple MacBook Air',
        price: 1299.99,
        description: 'Apple MacBook Air with M1 chip',
      },
      {
        name: 'Dell XPS 13',
        price: 1149.99,
        description: 'Dell XPS 13 with Intel Core i7',
      },
    ];

    // Insert sample data into the database
    await Product.deleteMany({}); // Clear existing data
    await Product.insertMany(products);

    console.log('Sample data inserted successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting sample data:', err);
  }
};

seedProducts();
