import { Request, Response } from 'express';
import { poolPromise } from '../database/connection';
import { IUserLogin, IUserRegister } from '../models/user.model';

import { comparePasswords, generateJwt, handleDatabaseError, hashPassword } from '../utils';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const userData: IUserRegister = req.body;

    try {
        const { rol_id, correo_electronico, nombre, password, telefono, nombre_completo, direccion } = userData;

        if (!rol_id || !correo_electronico || !nombre || !password) {
            res.status(400).json({ error: 'Todos los campos requeridos deben estar completos.' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const pool = await poolPromise;
        await pool.request()
            .input('rol_id', rol_id)
            .input('correo_electronico', correo_electronico)
            .input('nombre', nombre)
            .input('password', hashedPassword)
            .input('telefono', telefono || null)
            .input('direccion', direccion || null)
            .input('nombre_completo', nombre_completo || null)
            .execute('sp_usuario_create');

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);

        const { status, message } = handleDatabaseError(error);

        res.status(status).json({ error: message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const userData: IUserLogin = req.body;

    try {
        const { correo_electronico, password } = userData;

        if (!correo_electronico || !password) {
            res.status(400).json({ error: 'El correo y la contraseña son obligatorios.' });
            return;
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('correo_electronico', correo_electronico)    
            .execute('sp_usuario_login');

        const user = result.recordset[0];

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado.' });
            return;
        }

        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Credenciales inválidas ó incorrectas' });
            return;
        }

        const token = generateJwt({
            usuario_id: user.usuario_id,
            nombre: user.nombre,
            rol_id: user.rol_id,
            estado_id: user.estado_id,
        });

        res.cookie('auth_token', token, {
            httpOnly: false,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            data: {
                usuario_id: user.usuario_id,
                nombre: user.nombre,
                rol_id: user.rol_id,
                estado_id: user.estado_id,
                correo_electronico: user.correo_electronico
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        const { status, message } = handleDatabaseError(error);

        res.status(status).json({ error: message });
    }
};