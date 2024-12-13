import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const productosGetPorEstado = async (req: Request, res: Response): Promise<void> => {
    const { estado_id } = req.query;

    try {
        const productos: any[] = await sequelize.query(
            'EXEC sp_producto_listar_por_estado :estado_id',
            {
                replacements: { estado_id: estado_id || null },
                type: QueryTypes.SELECT,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Productos listados exitosamente.',
            data: productos,
        });
    } catch (error) {
        console.error('Error al listar productos:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};

export const productoCreate = async (req: Request, res: Response): Promise<void> => {
    const { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, url_imagen } = req.body;

    try {
        if (!categoria_producto_id || !estado_id || !nombre || !precio) {
            res.status(400).json({
                success: false,
                message: 'Los campos categoría, estado, nombre y precio son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_producto_create :categoria_producto_id, :estado_id, :nombre, :marca, :codigo, :stock, :precio, :url_imagen',
            {
                replacements: { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, url_imagen },
                type: QueryTypes.RAW,
            }
        );

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al crear el producto: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const productoUpdate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, url_imagen } = req.body;

    try {
        if (!id || !categoria_producto_id || !estado_id || !nombre || !precio) {
            res.status(400).json({
                success: false,
                message: 'Los campos ID, categoría, estado, nombre y precio son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_producto_update :producto_id, :categoria_producto_id, :estado_id, :nombre, :marca, :codigo, :stock, :precio, :url_imagen',
            {
                replacements: { producto_id: id, categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, url_imagen },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el producto: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const productoUpdateEstado = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { estado_id } = req.body;

    try {
        if (!id || !estado_id) {
            res.status(400).json({
                success: false,
                message: 'El ID del producto y el ID del estado son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_producto_update_estado :producto_id, :estado_id',
            {
                replacements: {
                    producto_id: parseInt(id),
                    estado_id: parseInt(estado_id),
                },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: 'El estado del producto ha sido actualizado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el estado del producto: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};
