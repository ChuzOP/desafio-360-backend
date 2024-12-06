import sql from 'mssql';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const sqlConfig: sql.config = {
    user: process.env.DB_USER || 'sa', // Usuario de la base de datos
    password: process.env.DB_PASSWORD || '', // Contraseña del usuario
    server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS', // Servidor de la base de datos
    database: process.env.DB_DATABASE || '', // Nombre de la base de datos
    port: parseInt(process.env.DB_PORT || '1433'), // Puerto de conexión
    options: {
        encrypt: true, // Activar cifrado para la conexión
        trustServerCertificate: true // Permitir certificados de servidor no confiables
    }
};

// Crear un pool de conexiones y manejar la conexión
export const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool; // Devolver el pool de conexiones
    })
    .catch((err) => {
        console.error('Database connection failed:', err); // Manejo de errores
        throw err; // Lanzar el error para su manejo en otros lugares
    });
