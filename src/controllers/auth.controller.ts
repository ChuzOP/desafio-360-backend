import { Request, Response } from 'express';
import { poolPromise } from '../database/connection';
import { hashPassword } from '../utils/hash';

/**
 * Registro de un nuevo usuario.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    const {
        rol_id,
        correo_electronico,
        nombre,
        password,
        telefono,
        nombre_completo,
        direccion,
    } = req.body;

    try {
        // Validar datos requeridos
        if (!rol_id || !correo_electronico || !nombre || !password) {
            res.status(400).json({ error: 'Todos los campos requeridos deben estar completos.' });
            return;
        }

        // Hashear la contraseña
        const hashedPassword = await hashPassword(password);

        // Conexión y ejecución del procedimiento almacenado
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
        res.status(500).json({ error: 'Hubo un problema al registrar el usuario.' });
    }
};
