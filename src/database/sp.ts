import sequelize from './connection';
import { QueryTypes } from 'sequelize';

export const executeSP = async (
    spName: string,
    params: { [key: string]: any }
) => {
    try {
        const paramEntries = Object.entries(params);
        const paramString = paramEntries
            .map(([key]) => `@${key} = :${key}`)
            .join(', ');

        const query = `EXEC ${spName} ${paramString}`;

        const result = await sequelize.query(query, {
            replacements: params,
            type: QueryTypes.SELECT // Asegúrate de usar QueryTypes desde 'sequelize'
        });

        return result;
    } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error);
        throw error;
    }
};
