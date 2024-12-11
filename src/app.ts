import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger';

import sequelize from './database/connection';
import routes from './routes/index.routes';
import { customCss } from './utils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Centralización de rutas
app.use('/api', routes);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, {
        customSiteTitle: 'Backend API Documentation',
        customCss
    })
);

// Verificar conexión a la base de datos
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión con la base de datos establecida.');
    })
    .catch((error) => {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
