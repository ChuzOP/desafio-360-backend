import express from 'express';
import dotenv from 'dotenv';
import { poolPromise } from './database/connection';

import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Test
poolPromise.then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
