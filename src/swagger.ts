import swaggerJsdoc from 'swagger-jsdoc';
import {
    authDocs,
    categoriaDocs,
    clienteDocs,
    estadoDocs,
    ordenDocs,
    productoDocs,
    usuarioDocs
} from './docs';

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
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'auth_token',
                    description:
                        'Token de autenticación almacenado en las cookies. Al utilizar el servicio de login, automáticamente se almacenará un token en la cookie `auth_token`.'
                }
            }
        },
        paths: {
            ...authDocs,
            ...categoriaDocs,
            ...estadoDocs,
            ...usuarioDocs,
            ...productoDocs,
            ...clienteDocs,
            ...ordenDocs
        }
    },
    apis: []
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
export default swaggerSpecs;
