import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const productosGetPorEstado = async (req: Request, res: Response): Promise<void> => {
    const { estado_id } = req.query;

    try {
        const productos: any[] = await sequelize.query(
            'EXEC sp_producto_list_by_estado :estado_id',
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

export const productosGetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const producto: any[] = await sequelize.query(
            'EXEC sp_producto_list_by_id :@producto_id',
            {
                replacements: { producto_id: id },
                type: QueryTypes.SELECT,
            }
        );

        if (!producto || producto.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No se encontro el producto.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Producto listado exitosamente.',
            data: producto[0],
        });
    } catch (error) {
        console.error('Error al listar producto:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};

export const productoCreate = async (req: Request, res: Response): Promise<void> => {
    const { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio } = req.body;
    const imagen = req.file;
    
    try {
        if (!categoria_producto_id || !estado_id || !nombre || !precio) {
            res.status(400).json({
                success: false,
                message: 'Los campos categoría, estado, nombre y precio son obligatorios.',
            });
            return;
        }

        const imagenBuffer = imagen ? imagen.buffer : null;

        await sequelize.query(
            'EXEC sp_producto_create :categoria_producto_id, :estado_id, :nombre, :marca, :codigo, :stock, :precio, :imagen',
            {
                replacements: { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, imagen: imagenBuffer },
                type: QueryTypes.RAW,
            }
        );

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente.',
        });
    } catch (error: any) {
        console.log(error);
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
    const { categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, imagen } = req.body;

    try {
        if (!id || !categoria_producto_id || !estado_id || !nombre || !precio) {
            res.status(400).json({
                success: false,
                message: 'Los campos ID, categoría, estado, nombre y precio son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_producto_update :producto_id, :categoria_producto_id, :estado_id, :nombre, :marca, :codigo, :stock, :precio, :imagen',
            {
                replacements: { producto_id: id, categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, imagen },
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
