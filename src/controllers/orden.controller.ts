import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const ordenesList = async (req: Request, res: Response): Promise<void> => {
    const { cliente_id, estado_id } = req.query;

    try {
        const ordenes: any[] = await sequelize.query(
            'EXEC sp_ordenes_list :cliente_id, :estado_id',
            {
                replacements: { cliente_id: cliente_id || null, estado_id: estado_id || null },
                type: QueryTypes.SELECT,
            }
        );

        const formatedOrdenes = ordenes.map(orden => {
            if (typeof orden.detalle_orden === 'string') {
                try {
                    orden.detalle_orden = JSON.parse(orden.detalle_orden);
                } catch (parseError) {
                    console.error('Error al parsear el detalle de la orden:', parseError);
                    orden.detalle_orden = [];
                }
            }
            return orden;
        });

        res.status(200).json({
            success: true,
            message: 'Órdenes listadas exitosamente.',
            data: formatedOrdenes,
        });
    } catch (error) {
        console.error('Error al listar órdenes:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};

export const ordenCreate = async (req: Request, res: Response): Promise<void> => {
    const {
        cliente_id,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        orden_detalle
    } = req.body;

    try {
        if (!cliente_id || !direccion || !telefono || !correo_electronico || !fecha_entrega || !orden_detalle) {
            res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios.',
            });
            return;
        }

        const detallesJson = JSON.stringify(orden_detalle);

        await sequelize.query(
            'EXEC sp_orden_create @cliente_id = :cliente_id, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @detalles = :detalles',
            {
                replacements: {
                    cliente_id,
                    direccion,
                    telefono,
                    correo_electronico,
                    fecha_entrega,
                    detalles: detallesJson
                },
                type: QueryTypes.SELECT
            }
        );

        res.status(201).json({
            success: true,
            message: 'Orden creada exitosamente.',
        });
    } catch (error) {
        console.error('Error al crear la orden:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};

export const ordenAprobar = async (req: Request, res: Response): Promise<void> => {
    const { orden_id } = req.params;

    try {
        if (!orden_id) {
            res.status(400).json({
                success: false,
                message: 'El ID de la orden es obligatorio.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_orden_aprobar :orden_id',
            {
                replacements: { orden_id },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: "Orden aprobada correctamente",
        });
    } catch (error) {
        console.error('Error al aprobar la orden:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};

export const ordenCancelar = async (req: Request, res: Response): Promise<void> => {
    const { orden_id } = req.params;

    try {
        if (!orden_id) {
            res.status(400).json({
                success: false,
                message: 'El ID de la orden es obligatorio.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_orden_cancelar :orden_id',
            {
                replacements: { orden_id },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: "Orden Cancelada correctamente",
        });
    } catch (error) {
        console.error('Error al cancelar la orden:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};
