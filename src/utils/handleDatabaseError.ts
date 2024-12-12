import { ValidationError, UniqueConstraintError, DatabaseError } from 'sequelize';

export const handleDatabaseError = (error: any): { status: number; message: string } => {
    if (error.parent && error.parent.number) {
        return {
            status: 400,
            message: error.message || 'Error no controlado',
        };
    }

    if (error instanceof ValidationError) {
        return {
            status: 400,
            message: error.errors.map(err => err.message).join(', '),
        };
    }

    if (error instanceof UniqueConstraintError) {
        return {
            status: 400,
            message: 'El registro viola una restricción de índice único. Verifica los datos ingresados.',
        };
    }

    if (error instanceof DatabaseError) {
        return {
            status: 500,
            message: `Error en la base de datos: ${error.message}`,
        };
    }

    const error_message = `Ocurrió un error inesperado: ${typeof error === 'object' && error !== null ? JSON.stringify(error, null, 2) : String(error)}`;
    return {
        status: 500,
        message: error_message
    };
};
