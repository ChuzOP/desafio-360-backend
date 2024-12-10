import bcrypt from 'bcryptjs';

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};