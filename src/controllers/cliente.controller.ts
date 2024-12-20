import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const clientesGetAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientes: any[] = await sequelize.query(
            'EXEC sp_clientes_list',
            { type: QueryTypes.SELECT }
        );

        if (!clientes || clientes.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron clientes.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Clientes listados exitosamente.',
            data: clientes
        });
    } catch (error) {
        console.error('Error al listar clientes:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message
        });
    }
};

export const clienteUpdate = async (req: Request, res: Response): Promise<void> => {
    const { cliente_id } = req.params;
    const { nombre_completo, direccion, telefono } = req.body;

    try {
        if (!cliente_id || !nombre_completo || !direccion || !telefono) {
            res.status(400).json({
                success: false,
                message: 'El ID del cliente, el nombre completo y la dirección son obligatorios.'
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_cliente_editar :cliente_id, :nombre_completo, :direccion, :telefono',
            {
                replacements: {
                    cliente_id,
                    nombre_completo,
                    direccion,
                    telefono
                },
                type: QueryTypes.RAW
            }
        );

        res.status(200).json({
            success: true,
            message: 'Cliente actualizado exitosamente.'
        });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message
        });
    }
};