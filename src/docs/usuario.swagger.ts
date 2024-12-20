export const usuarioDocs = {
    '/api/usuario': {
        get: {
            summary: 'Listar usuarios',
            description:
                'Obtiene un listado de usuarios filtrado opcionalmente por estado o rol.',
            tags: ['Usuarios'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'estado_id',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'number',
                    },
                    description:
                        'ID del estado para filtrar usuarios. Si no se proporciona, se listarán todos los estados.'
                },
                {
                    name: 'rol_id',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'number',
                    },
                    description:
                        'ID del rol para filtrar usuarios. Si no se proporciona, se listarán todos los roles.'
                }
            ],
            responses: {
                '200': {
                    description: 'Listado de usuarios obtenido exitosamente.',
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
                                            'Usuarios listados exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number',
                                                    example: 1
                                                },
                                                nombre: {
                                                    type: 'string',
                                                    example: 'Juan Pérez'
                                                },
                                                estado_id: {
                                                    type: 'number',
                                                    example: 1
                                                },
                                                rol_id: {
                                                    type: 'number',
                                                    example: 2
                                                },
                                                telefono: {
                                                    type: 'string',
                                                    example: '555-1234'
                                                },
                                                direccion: {
                                                    type: 'string',
                                                    example: 'Calle Falsa 123'
                                                },
                                                nombre_completo: {
                                                    type: 'string',
                                                    example:
                                                        'Juan Alberto Pérez Gómez'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error en los parámetros de la consulta.',
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
                                            'Los parámetros de consulta no son válidos.'
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
                                            'Error al listar usuarios: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error en la base de datos: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/usuario/{id}': {
        put: {
            summary: 'Actualizar un usuario existente',
            description:
                'Este endpoint permite actualizar los datos de un usuario registrado en el sistema.',
            tags: ['Usuarios'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '1'
                    },
                    description: 'ID del usuario a actualizar.'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                estado_id: {
                                    type: 'string',
                                    description: 'ID del estado del usuario.',
                                    example: '2'
                                },
                                rol_id: {
                                    type: 'string',
                                    description:
                                        'ID del rol asignado al usuario.',
                                    example: '1'
                                },
                                nombre: {
                                    type: 'string',
                                    description: 'Nombre del usuario.',
                                    example: 'Juan Pérez'
                                },
                                telefono: {
                                    type: 'string',
                                    description: 'Teléfono del usuario.',
                                    example: '123456789'
                                },
                                direccion: {
                                    type: 'string',
                                    description: 'Dirección del usuario.',
                                    example: 'Calle Falsa 123'
                                },
                                nombre_completo: {
                                    type: 'string',
                                    description: 'Nombre completo del usuario.',
                                    example: 'Juan Manuel Pérez López'
                                }
                            },
                            required: ['estado_id', 'rol_id', 'nombre']
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Usuario actualizado exitosamente.',
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
                                            'Usuario actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación: Faltan parámetros obligatorios o hay errores en los datos.',
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
                                            'Los campos usuario_id, estado_id, rol_id, nombre son obligatorios.'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description:
                        'Error interno del servidor o error en la base de datos.',
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
                                            'Error al actualizar el usuario: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error en la base de datos: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/usuario/estado/{id}': {
        put: {
            summary: 'Actualizar el estado de un usuario',
            description:
                'Permite actualizar únicamente el estado asociado a un usuario en el sistema.',
            tags: ['Usuarios'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '1'
                    },
                    description: 'ID del usuario cuyo estado será actualizado.'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                estado_id: {
                                    type: 'number',
                                    description:
                                        'ID del nuevo estado del usuario.',
                                    example: 2
                                }
                            },
                            required: ['estado_id']
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description:
                        'El estado del usuario ha sido actualizado exitosamente.',
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
                                            'El estado del usuario ha sido actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación: Faltan parámetros obligatorios o hay errores en los datos.',
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
                                            'El ID del usuario y el ID del estado son obligatorios.'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description:
                        'Error interno del servidor o error en la base de datos.',
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
                                            'Error al actualizar el estado del usuario: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error en la base de datos: <detalle del error>'
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
