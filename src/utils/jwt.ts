import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ola123';
const JWT_EXPIRATION = '24h';

export const generateJwt = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyJwt = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
