export const categoriaDocs = {
    '/api/categoria': {
        get: {
            summary: 'Obtener todas las categorías',
            description:
                'Endpoint para listar todas las categorías de productos disponibles. Requiere que el token de autenticación esté almacenado en la cookie `auth_token`.',
            tags: ['Categorías'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'Categorías listadas exitosamente.',
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
                                            'Categorías listadas exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                categoria_id: {
                                                    type: 'integer',
                                                    description:
                                                        'ID de la categoría.',
                                                    example: 1
                                                },
                                                nombre: {
                                                    type: 'string',
                                                    description:
                                                        'Nombre de la categoría.',
                                                    example: 'Electrónicos'
                                                },
                                                descripcion: {
                                                    type: 'string',
                                                    description:
                                                        'Descripción de la categoría.',
                                                    example:
                                                        'Productos electrónicos y dispositivos.'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description:
                        'Token de autenticación faltante o inválido en la cookie `auth_token`.',
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
                                            'Token de autenticación faltante o inválido en la cookie `auth_token`.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/categoria/': {
        post: {
            summary: 'Crear nueva categoría',
            description:
                'Endpoint para crear una nueva categoría en el sistema. Requiere que el token de autenticación esté almacenado en la cookie `auth_token`.',
            tags: ['Categorías'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                categoria: {
                                    type: 'string',
                                    description:
                                        'Nombre de la categoría a crear',
                                    example: 'Electrónica'
                                }
                            },
                            required: ['categoria']
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Categoría creada exitosamente',
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
                                            'Categoría creada exitosamente.'
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
                                    success: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'El nombre de la categoría es obligatorio y debe ser una cadena de texto.'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
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
                                            'Error al crear la categoría: [mensaje de error específico]'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/categoria/{id}': {
        put: {
            summary: 'Actualizar una categoría existente',
            description:
                'Este endpoint permite actualizar el nombre de una categoría existente en el sistema.',
            tags: ['Categorías'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID de la categoría que se desea actualizar.',
                    schema: {
                        type: 'string'
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nueva_categoria: {
                                    type: 'string',
                                    description:
                                        'Nuevo nombre para la categoría.',
                                    example: 'test'
                                }
                            },
                            required: ['categoria']
                        }
                    }
                }
            },
            security: [
                {
                    cookieAuth: []
                }
            ],
            responses: {
                '200': {
                    description: 'Categoría actualizada exitosamente.',
                    schema: {
                        type: 'object',
                        properties: {
                            success: {
                                type: 'boolean',
                                example: true
                            },
                            message: {
                                type: 'string',
                                example: 'Categoría actualizada exitosamente.'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error de validación.',
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
                                    'El ID de la categoría y el nuevo nombre son obligatorios.'
                            }
                        }
                    }
                },
                '500': {
                    description: 'Error interno del servidor.',
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
                                    'Ocurrió un error al actualizar la categoría.'
                            },
                            error: {
                                type: 'string',
                                example:
                                    'Error al crear la categoría: <error details>'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/categoria/estado/{id}': {
        put: {
            summary: 'Actualizar el estado de una categoría',
            description:
                'Este endpoint permite actualizar el estado de una categoría existente en el sistema.',
            tags: ['Categorías'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID de la categoría que se desea actualizar.',
                    schema: {
                        type: 'string'
                    }
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
                                    description:
                                        'ID del nuevo estado para la categoría.',
                                    example: '2'
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
                        'El estado de la categoría ha sido actualizado exitosamente.',
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
                                            'El estado de la categoría ha sido actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error de validación.',
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
                                            'El ID de la categoría y el ID del estado son obligatorios.'
                                    },
                                    error: {
                                        type: 'object',
                                        properties: {
                                            validation: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'string',
                                                        nullable: true
                                                    },
                                                    estado_id: {
                                                        type: 'string',
                                                        nullable: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Error interno del servidor.',
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
                                            'Error al actualizar el estado de la categoría: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al actualizar el estado de la categoría: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            security: [
                {
                    cookieAuth: []
                }
            ]
        }
    }
};
