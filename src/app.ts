import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { poolPromise } from './database/connection';
import routes from './routes/index.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Centralización de rutas
app.use('/api', routes);

// Prueba de conexión a la base de datos
poolPromise
    .then(() => {
        console.log('Database connection established');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
