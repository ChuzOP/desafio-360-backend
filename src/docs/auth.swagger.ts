export const authDocs = {
    '/api/auth/registerUser': {
        post: {
            summary: 'Registro de un nuevo usuario',
            description:
                'Endpoint para registrar un nuevo usuario en el sistema.',
            tags: ['Autenticación'],
            security: [],
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
                                    description:
                                        'Correo electrónico del usuario',
                                    example: 'usuario@example.com'
                                },
                                password: {
                                    type: 'string',
                                    description: 'Contraseña del usuario',
                                    example: 'PasswordEncriptada123'
                                },
                                nombre: {
                                    type: 'string',
                                    description: 'Nombre del usuario',
                                    example: 'Fulano de Tal'
                                },
                                telefono: {
                                    type: 'string',
                                    description:
                                        'Número de teléfono del usuario (opcional)',
                                    example: '+50212345678'
                                },
                                direccion: {
                                    type: 'string',
                                    description:
                                        'Dirección del usuario (opcional)',
                                    example: 'Zona 10, Ciudad de Guatemala'
                                },
                                nombre_completo: {
                                    type: 'string',
                                    description:
                                        'Nombre completo del usuario (opcional)',
                                    example: 'Fulano de Tal Pérez'
                                }
                            },
                            required: [
                                'rol_id',
                                'correo_electronico',
                                'password',
                                'nombre'
                            ]
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Usuario registrado exitosamente.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Usuario registrado exitosamente.'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            correo_electronico: {
                                                type: 'string',
                                                example: 'usuario@example.com'
                                            },
                                            nombre: {
                                                type: 'string',
                                                example: 'Fulano de Tal'
                                            },
                                            rol_id: {
                                                type: 'integer',
                                                example: 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación en los datos enviados o restricción de índice único.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Todos los campos requeridos deben estar completos.'
                                    },
                                    error: {
                                        type: 'object',
                                        example: {
                                            validation: {
                                                rol_id: null,
                                                correo_electronico:
                                                    'usuario@example.com',
                                                nombre: 'Fulano de Tal',
                                                password: 'Password123'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description:
                        'Error interno del servidor o de la base de datos.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Error en la base de datos: El servidor no está disponible.'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Detalles adicionales del error.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/auth/loginUser': {
        post: {
            summary: 'Inicio de sesión de usuario',
            description:
                'Endpoint para autenticar un usuario y obtener un token de acceso.',
            tags: ['Autenticación'],
            security: [],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                correo_electronico: {
                                    type: 'string',
                                    description:
                                        'Correo electrónico del usuario',
                                    example: 'operador1@example.com'
                                },
                                password: {
                                    type: 'string',
                                    description: 'Contraseña del usuario',
                                    example: 'PasswordEncriptada123'
                                }
                            },
                            required: ['correo_electronico', 'password']
                        }
                    }
                }
            },
            responses: {
                '200': {
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
                                                description:
                                                    'Nombre del usuario',
                                                example: 'Fulano de Tal'
                                            },
                                            rol_id: {
                                                type: 'integer',
                                                description:
                                                    'ID del rol del usuario',
                                                example: 2
                                            },
                                            estado_id: {
                                                type: 'integer',
                                                description:
                                                    'Estado del usuario',
                                                example: 1
                                            },
                                            correo_electronico: {
                                                type: 'string',
                                                description:
                                                    'Correo electrónico del usuario',
                                                example: 'usuario@example.com'
                                            },
                                            auth_token: {
                                                type: 'string',
                                                description:
                                                    'Token de autenticación',
                                                example:
                                                    'tutokenexample'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error de validación en los datos enviados',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example:
                                            'El correo y la contraseña son obligatorios.'
                                    }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Credenciales inválidas o incorrectas',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example:
                                            'Credenciales inválidas o incorrectas.'
                                    }
                                }
                            }
                        }
                    }
                },
                '404': {
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
                },
                '500': {
                    description:
                        'Error interno del servidor o de base de datos',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Error al iniciar sesión: Error interno.'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Ocurrió un error inesperado: {...}'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/auth/logoutUser': {
        post: {
            summary: 'Cerrar sesión del usuario',
            description:
                'Endpoint para cerrar la sesión del usuario eliminando la cookie de autenticación.',
            tags: ['Autenticación'],
            security: [],
            responses: {
                '200': {
                    description: 'Sesión cerrada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Sesión cerrada exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Error al cerrar la sesión',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Ocurrió un error al cerrar la sesión. Inténtelo de nuevo más tarde.'
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
