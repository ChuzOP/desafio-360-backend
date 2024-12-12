import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const productosGetPorEstado = async (req: Request, res: Response): Promise<void> => {
    const { estado } = req.query;

    try {
        const productos: any[] = await sequelize.query(
            'EXEC sp_producto_listar_por_estado :nombre_estado',
            {
                replacements: { nombre_estado: estado || null },
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
    const { nombre_estado } = req.body;

    try {
        if (!id || !nombre_estado) {
            res.status(400).json({
                success: false,
                message: 'El ID del producto y el nombre del estado son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_producto_update_estado :producto_id, :nombre_estado',
            {
                replacements: { producto_id: id, nombre_estado },
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