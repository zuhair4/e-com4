import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', productRoutes);

export default app;
