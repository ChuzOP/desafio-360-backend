import { poolPromise } from './connection';

export const executeSP = async (spName: string, params: { [key: string]: any }) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Añadimos los parámetros al request
        Object.keys(params).forEach((key) => {
            request.input(key, params[key]);
        });

        // Ejecutamos el SP
        const result = await request.execute(spName);
        return result.recordset;
    } catch (error) {
        console.error('Error executing stored procedure:', error);
        throw error;
    }
};
