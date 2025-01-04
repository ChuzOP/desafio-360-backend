import { Request, Response } from 'express';
import sequelize from '../database/connection';
import { QueryTypes } from 'sequelize';

import {
    comparePasswords,
    generateJwt,
    handleDatabaseError,
    hashPassword
} from '../utils';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    try {
        const { rol_id, correo_electronico, nombre, password, telefono, direccion, nombre_completo } = userData;

        if (!rol_id || !correo_electronico || !nombre || !password) {
            res.status(400).json({
                success: false,
                message: 'Todos los campos requeridos deben estar completos.',
                error: {
                    validation: { rol_id, correo_electronico, nombre, password }
                }
            });
            return;
        };

        const hashedPassword = await hashPassword(password);

        await sequelize.query(
            'EXEC sp_usuario_create :rol_id, :correo_electronico, :nombre, :password, :telefono, :direccion, :nombre_completo',
            {
                replacements: {
                    rol_id,
                    correo_electronico,
                    nombre,
                    password: hashedPassword,
                    telefono: telefono || null,
                    direccion: direccion || null,
                    nombre_completo: nombre_completo || null
                },
                type: QueryTypes.RAW
            }
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente.',
            data: { correo_electronico, nombre, rol_id }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        const { status, message } = handleDatabaseError(error);
        
        res.status(status).json({ success: false, message, error: message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { correo_electronico, password } = req.body;

    try {
        if (!correo_electronico || !password) {
            res.status(400).json({
                error: 'El correo y la contraseña son obligatorios.'
            });
            return;
        }

        const [result]: any[] = await sequelize.query(
            'EXEC sp_usuario_login :correo_electronico',
            {
                replacements: { correo_electronico },
                type: QueryTypes.SELECT
            }
        );

        const user = result;

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado.' });
            return;
        }

        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({
                error: 'Credenciales inválidas o incorrectas.'
            });
            return;
        }

        const token = generateJwt({
            usuario_id: user.usuario_id,
            nombre: user.nombre,
            rol_id: user.rol_id,
            rol_nombre: user.rol_nombre,
            estado_id: user.estado_id
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        });

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso.',
            data: {
                usuario_id: user.usuario_id,
                nombre: user.nombre,
                rol_id: user.rol_id,
                estado_id: user.estado_id,
                correo_electronico: user.correo_electronico,
                auth_token: token
            }
        });
    } catch (error) {
        const error_message = `Error al iniciar sesión: ${error}`;
        console.error(error_message);

        const { status, message } = handleDatabaseError(error);
        res.status(status).json({
            success: false,
            message,
            error: error_message,
        });
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        });

        res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente.'
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al cerrar la sesión. Inténtelo de nuevo más tarde.'
        });
    }
};