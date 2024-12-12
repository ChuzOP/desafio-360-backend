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

export const categoriaCreate = async (req: Request, res: Response): Promise<void> => {
    const { categoria }: { categoria: string } = req.body;

    try {
        if (!categoria) {
            res.status(400).json({
                success: false,
                message: 'El nombre de la categoría es obligatorio y debe ser una cadena de texto.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_categoria_producto_create :categoria',
            {
                replacements: { categoria },
                type: QueryTypes.RAW,
            }
        );

        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al crear la categoría: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const categoriaUpdate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nueva_categoria } = req.body;

    try {
        if (!id || !nueva_categoria) {
            res.status(400).json({
                success: false,
                message: 'El ID de la categoría y el nuevo nombre son obligatorios.'
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_categoria_producto_update :categoria_producto_id, :nueva_categoria',
            {
                replacements: {
                    categoria_producto_id: id,
                    nueva_categoria
                },
                type: QueryTypes.RAW
            }
        );

        res.status(200).json({
            success: true,
            message: 'Categoría actualizada exitosamente.'
        });
    } catch (error: any) {
        const error_message = `Error al crear la categoría: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message
        });
    }
};

export const updateCategoriaEstado = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre_estado } = req.body;

    try {
        if (!id || !nombre_estado) {
            res.status(400).json({
                success: false,
                message: 'El ID de la categoría y el nombre del estado son obligatorios.',
                error: {
                    validation: { id, nombre_estado }
                }
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_categoria_producto_update_estado :categoria_producto_id, :nombre_estado',
            {
                replacements: {
                    categoria_producto_id: id,
                    nombre_estado,
                },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: 'El estado de la categoría ha sido actualizado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el estado de la categoría: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};
