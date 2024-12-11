import { Request, Response } from 'express';
import { poolPromise } from '../database/connection';

export const getCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM vw_categoria_producto_list');
        
        res.status(200).json({
            success: true,
            data: result.recordset,
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener las categorías.',
            error: error,
        });
    }
};
