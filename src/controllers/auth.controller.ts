import { Request, Response } from 'express';
import { poolPromise } from '../database/connection';
import { IUserRegister } from '../models/user.model';

import { handleDatabaseError, hashPassword } from '../utils';

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
