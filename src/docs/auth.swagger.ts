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
    '/api/auth/loginUser': {
        post: {
            summary: 'Inicio de sesión de usuario',
            description: 'Endpoint para autenticar un usuario y obtener un token de acceso.',
            tags: ['Autenticación'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                correo_electronico: {
                                    type: 'string',
                                    description: 'Correo electrónico del usuario',
                                    example: 'usuario@example.com'
                                },
                                password: {
                                    type: 'string',
                                    description: 'Contraseña del usuario',
                                    example: 'password123'
                                }
                            },
                            required: ['correo_electronico', 'password']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Inicio de sesión exitoso',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Inicio de sesión exitoso.'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            usuario_id: {
                                                type: 'integer',
                                                description: 'ID del usuario',
                                                example: 1
                                            },
                                            nombre: {
                                                type: 'string',
                                                description: 'Nombre del usuario',
                                                example: 'Fulano de Tal'
                                            },
                                            rol_id: {
                                                type: 'integer',
                                                description: 'ID del rol del usuario',
                                                example: 2
                                            },
                                            estado_id: {
                                                type: 'integer',
                                                description: 'Estado del usuario',
                                                example: 1
                                            },
                                            correo_electronico: {
                                                type: 'string',
                                                description: 'Correo electrónico del usuario',
                                                example: 'usuario@example.com'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error de validación en los datos enviados',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'El correo y la contraseña son obligatorios.'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Credenciales inválidas o incorrectas',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Credenciales inválidas o incorrectas.'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Usuario no encontrado.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
