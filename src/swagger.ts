import swaggerJsdoc from 'swagger-jsdoc';
import { authDocs } from './docs';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API con NODEJS + Express y TypeScript',
            version: '1.0.0',
            description: 'Documentación de la API para el desafío web 360'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{ bearerAuth: [] }],
        paths: {
            ...authDocs,
        }
    },
    apis: [],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
export default swaggerSpecs;
