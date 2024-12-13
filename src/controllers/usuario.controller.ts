import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../database/connection';
import { handleDatabaseError } from '../utils';

export const usuarioUpdate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { estado_id, rol_id, nombre, telefono, direccion, nombre_completo } = req.body;

    try {
        if (!id || !estado_id || !rol_id || !nombre) {
            res.status(400).json({
                success: false,
                message: 'Los campos usuario_id, estado_id, rol_id, nombre son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_usuario_update :usuario_id, :estado_id, :rol_id, :nombre, :telefono, :direccion, :nombre_completo',
            {
                replacements: { usuario_id: id, estado_id, rol_id, nombre, telefono, direccion, nombre_completo },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el usuario: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const usuarioUpdateEstado = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { estado_id } = req.body;

    try {
        if (!id || !estado_id) {
            res.status(400).json({
                success: false,
                message: 'El ID del usuario y el ID del estado son obligatorios.',
            });
            return;
        }

        await sequelize.query(
            'EXEC sp_usuario_update_estado :usuario_id, :estado_id',
            {
                replacements: {
                    usuario_id: parseInt(id),
                    estado_id: parseInt(estado_id),
                },
                type: QueryTypes.RAW,
            }
        );

        res.status(200).json({
            success: true,
            message: 'El estado del usuario ha sido actualizado exitosamente.',
        });
    } catch (error: any) {
        const error_message = `Error al actualizar el estado del usuario: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const usuariosList = async (req: Request, res: Response): Promise<void> => {
    const { estado_id, rol_id } = req.query;

    try {
        const usuarios: any[] = await sequelize.query(
            'EXEC sp_usuarios_list :estado_id, :rol_id',
            {
                replacements: { estado_id: estado_id || null, rol_id: rol_id || null },
                type: QueryTypes.SELECT,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Usuarios listados exitosamente.',
            data: usuarios,
        });
    } catch (error) {
        console.error('Error al listar usuarios:', error);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: message,
        });
    }
};
