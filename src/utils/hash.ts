import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        throw new Error('No se pudo hashear la contraseña.');
    }
};
