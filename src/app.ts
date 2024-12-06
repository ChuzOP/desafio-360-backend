import express from 'express';
import dotenv from 'dotenv';
import { poolPromise } from './database/connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Database Test
poolPromise.then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
