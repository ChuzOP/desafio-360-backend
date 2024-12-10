import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
    usuario_id: number;
    nombre: string;
    rol_id: number;
    estado_id: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó token de autenticación.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload; // Verifica y decodifica el token
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token inválido:', error);
        return res.status(403).json({ error: 'Token de autenticación no válido.' });
    }
};

export default authMiddleware;
