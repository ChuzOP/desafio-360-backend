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

export const clienteGetById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cliente_id } = req.params;
        const cliente: any[] = await sequelize.query(
            'EXEC sp_cliente_list_by_id :cliente_id',
            { 
                replacements: { 
                    cliente_id
                } ,
                type: QueryTypes.SELECT 
            }
        );
        
        if (!cliente || cliente.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron clientes.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Clientes listados exitosamente.',
            data: cliente[0]
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

export const clientesGetByUsuarioId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuario_id } = req.params;
        const cliente: any[] = await sequelize.query(
            'EXEC sp_clientes_list_by_usuario_id :usuario_id',
            { 
                replacements: { 
                    usuario_id
                } ,
                type: QueryTypes.SELECT 
            }
        );
        
        if (!cliente || cliente.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontraron clientes.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Clientes listados exitosamente.',
            data: cliente[0]
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
            'EXEC sp_cliente_update :cliente_id, :nombre_completo, :direccion, :telefono',
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

export const clienteInactivate = async (req: Request, res: Response): Promise<void> => {
    const { cliente_id } = req.params;

    try {
        if (!cliente_id) {
            res.status(400).json({
                success: false,
                message: 'El ID del cliente son obligatorios.'
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_usuario_inactivar_por_cliente :cliente_id',
            {
                replacements: {
                    cliente_id
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