import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || '';
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(mongoURI); // No need for options

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
