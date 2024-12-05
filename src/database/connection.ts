import sql, { config, ConnectionPool } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const sqlConfig: config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER || 'localhost',
    options: {
        encrypt: true, // Usa true si el servidor lo requiere
        trustServerCertificate: true // Ajusta según el entorno
    }
};

// Promesa para la conexión
export const poolPromise: Promise<ConnectionPool> = new sql.ConnectionPool(
    sqlConfig
)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        throw err;
    });
