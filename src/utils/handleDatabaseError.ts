import { RequestError } from 'mssql';

export const handleDatabaseError = (error: any): { status: number; message: string } => {
    if (error instanceof RequestError) {
        // Errores comunes de SQL Server
        if (error.number === 2627) {
            return {
                status: 400,
                message: 'Ya existe un registro con datos iguales. Verifica la información nuevamente.',
            };
        }

        if (error.number === 547) {
            return {
                status: 400,
                message: 'El registro no puede completarse debido a una dependencia faltante.',
            };
        }

        if (error.number === 2601) {
            return {
                status: 400,
                message: 'El registro viola una restricción de índice único.',
            };
        }

        // Otros errores de SQL Server
        return {
            status: 500,
            message: `Error en la base de datos: ${error.message}`,
        };
    }

    // Errores no controlados
    return {
        status: 500,
        message: 'Ocurrió un error inesperado.',
    };
};
