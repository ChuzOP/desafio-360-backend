import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    username: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_SERVER || 'localhost',
    dialect: 'mssql',
    port: parseInt(process.env.DB_PORT || '1433'),
    timezone: '-06:00',
    dialectOptions: {
        encrypt: true,
        trustServerCertificate: true // Necesario para conexiones locales o autogeneradas
    },
    logging: false
});

export default sequelize;
