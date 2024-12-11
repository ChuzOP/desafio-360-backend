export const authDocs = {
    '/api/auth/registerUser': {
        post: {
            summary: 'Registro de un nuevo usuario',
            description: 'Endpoint para registrar un nuevo usuario en el sistema.',
            tags: ['Autenticación'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                rol_id: {
                                    type: 'integer',
                                    description: 'ID del rol del usuario',
                                    example: 1
                                },
                                correo_electronico: {
                                    type: 'string',
                                    description: 'Correo electrónico del usuario',
                                    example: 'usuario@example.com'
                                },
                                password: {
                                    type: 'string',
                                    description: 'Contraseña del usuario',
                                    example: 'password123'
                                },
                                nombre: {
                                    type: 'string',
                                    description: 'Nombre del usuario',
                                    example: 'Fulano de Tal'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Usuario registrado exitosamente'
                },
                400: {
                    description: 'Error de validación en los datos enviados'
                }
            }
        }
    },
    
};
