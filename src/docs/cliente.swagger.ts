export const clienteDocs = {
    '/api/cliente': {
        get: {
            summary: 'Listar todos los clientes',
            description:
                'Obtiene la lista de todos los clientes registrados en el sistema.',
            tags: ['Clientes'],
            security: [
                {
                    auth: []
                }
            ],
            responses: {
                '200': {
                    description: 'Lista de clientes obtenida exitosamente.',
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
                                            'Clientes listados exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                cliente_id: {
                                                    type: 'number',
                                                    example: 6
                                                },
                                                usuario_id: {
                                                    type: 'number',
                                                    example: 8
                                                },
                                                nombre_completo: {
                                                    type: 'string',
                                                    example:
                                                        'Juan Manuel Pérez López'
                                                },
                                                direccion: {
                                                    type: 'string',
                                                    example: 'Calle Falsa 123'
                                                },
                                                telefono: {
                                                    type: 'string',
                                                    example: '123456789'
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
                    description: 'No se encontraron clientes.',
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
                                        example: 'No se encontraron clientes.'
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
                                        example: 'Error al listar clientes.'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al acceder a la base de datos.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/cliente/{cliente_id}': {
        put: {
            summary: 'Actualizar cliente',
            description:
                'Actualiza la información de un cliente existente en el sistema.',
            tags: ['Clientes'],
            security: [
                {
                    auth: []
                }
            ],
            parameters: [
                {
                    name: 'cliente_id',
                    in: 'path',
                    required: true,
                    description: 'ID del cliente a actualizar.',
                    schema: {
                        type: 'number',
                        example: 1
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
                                nombre_completo: {
                                    type: 'string',
                                    example: 'Juan Pérez'
                                },
                                direccion: {
                                    type: 'string',
                                    example: 'Calle Falsa 123'
                                },
                                telefono: {
                                    type: 'string',
                                    example: '123456789'
                                }
                            },
                            required: [
                                'nombre_completo',
                                'direccion',
                                'telefono'
                            ]
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Cliente actualizado exitosamente.',
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
                                            'Cliente actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Solicitud incorrecta debido a parámetros faltantes.',
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
                                            'El ID del cliente, el nombre completo y la dirección son obligatorios.'
                                    }
                                }
                            }
                        }
                    }
                },
                '404': {
                    description: 'Cliente no encontrado.',
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
                                        example: 'Cliente no encontrado.'
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
                                            'Error al actualizar el cliente.'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al acceder a la base de datos.'
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
