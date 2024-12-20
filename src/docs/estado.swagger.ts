export const estadoDocs = {
    '/api/estado': {
        get: {
            summary: 'Obtener todos los estados',
            description:
                'Este endpoint permite obtener una lista de todos los estados disponibles en el sistema.',
            tags: ['Estados'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            responses: {
                '200': {
                    description: 'Lista de estados obtenida exitosamente.',
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
                                            'Estados listados exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'string',
                                                    example: '1'
                                                },
                                                nombre: {
                                                    type: 'string',
                                                    example: 'Activo'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '404': {
                    description: 'No se encontraron estados.',
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
                                        example: 'No se encontraron estados.'
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
                                            'Error al listar estados: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al listar estados: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/estado/': {
        post: {
            summary: 'Crear un nuevo estado',
            description:
                'Este endpoint permite crear un nuevo estado en el sistema.',
            tags: ['Estados'],
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
                                estado: {
                                    type: 'string',
                                    description: 'Nombre del nuevo estado.',
                                    example: 'Activo'
                                }
                            },
                            required: ['estado']
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Estado creado exitosamente.',
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
                                        example: 'Estado creado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación: El nombre del estado es obligatorio.',
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
                                            'El nombre del estado es obligatorio y debe ser una cadena de texto.'
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
                                            'Error al crear el estado: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al crear el estado: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/estado/{id}': {
        put: {
            summary: 'Actualizar un estado existente',
            description:
                'Este endpoint permite actualizar el nombre de un estado existente en el sistema.',
            tags: ['Estados'],
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
                    description: 'ID del estado a actualizar.'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nuevo_estado: {
                                    type: 'string',
                                    description: 'Nuevo nombre del estado.',
                                    example: 'Inactivo'
                                }
                            },
                            required: ['nuevo_estado']
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Estado actualizado exitosamente.',
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
                                            'Estado actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación: Faltan parámetros obligatorios.',
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
                                            'El ID del estado y el nuevo nombre son obligatorios.'
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
                                            'Error al actualizar el estado: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al actualizar el estado: <detalle del error>'
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
