import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const estadosGetAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const estados: any[] = await sequelize.query(
            'EXEC sp_estados_list',
            { type: QueryTypes.SELECT }
        );

        if (!estados || estados.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron estados.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Estados listados exitosamente.',
            data: estados
        });
    } catch (error) {
        console.error('Error al listar estados:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message
        });
    }
};

export const estadoCreate = async (req: Request, res: Response): Promise<void> => {
    const { estado }: { estado: string } = req.body;

    try {
        if (!estado) {
            res.status(400).json({
                success: false,
                message: 'El nombre del estado es obligatorio y debe ser una cadena de texto.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_estado_create :estado',
            {
                replacements: { estado },
                type: QueryTypes.RAW,
            }
        );

        res.status(201).json({
            success: true,
            message: 'Estado creado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al crear el estado: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const estadoUpdate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nuevo_estado } = req.body;

    try {
        if (!id || !nuevo_estado) {
            res.status(400).json({
                success: false,
                message: 'El ID del estado y el nuevo nombre son obligatorios.'
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_estado_update :estado_id, :nuevo_estado',
            {
                replacements: {
                    estado_id: id,
                    nuevo_estado
                },
                type: QueryTypes.RAW
            }
        );

        res.status(200).json({
            success: true,
            message: 'Estado actualizado exitosamente.'
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el estado: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message
        });
    }
};
