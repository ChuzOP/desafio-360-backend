import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const sqlConfig: sql.config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || '',
    port: parseInt(process.env.DB_PORT || '1433'),
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Crear un pool de conexiones y manejar la conexión
export const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        throw err;
    });
