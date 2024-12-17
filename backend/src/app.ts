import express from 'express';
import userRoutes from './modules/users/userRoutes';

const app = express();

// Middleware pour JSON
app.use(express.json());

// Middleware pour x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

export default app;
