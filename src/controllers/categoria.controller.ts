import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../database/connection';
import { handleDatabaseError } from  '../utils';

export const categoriasGetAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const categorias: any[] = await sequelize.query(
            'EXEC sp_categorias_productos_list',
            { type: QueryTypes.SELECT }
        );

        if (!categorias || categorias.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron categorías.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Categorías listadas exitosamente.',
            data: categorias
        });
    } catch (error) {
        console.error('Error al listar categorías:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message
        });
    }
};