import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils';

interface IUserPayload {
    usuario_id: number;
    nombre: string;
    rol_id: number;
    estado_id: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.status(401).json({ error: 'No se proporcionó token de autenticación.' });
        return;
    }

    try {
        const decoded = verifyJwt(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token inválido:', error);
        res.status(403).json({ error: 'Token de autenticación no válido.' });
        return;
    }
};
