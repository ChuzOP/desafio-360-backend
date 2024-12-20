export const ordenDocs = {
    '/api/orden': {
        get: {
            summary: 'Listar órdenes',
            description:
                'Este endpoint permite obtener una lista de todas las órdenes del sistema, filtradas opcionalmente por cliente o estado.',
            tags: ['Ordenes'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'cliente_id',
                    in: 'query',
                    description:
                        'ID del cliente para filtrar las órdenes (opcional)',
                    required: false,
                    schema: {
                        type: 'integer',
                        example: 8
                    }
                },
                {
                    name: 'estado_id',
                    in: 'query',
                    description:
                        'ID del estado para filtrar las órdenes (opcional)',
                    required: false,
                    schema: {
                        type: 'integer',
                        example: 7
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Órdenes listadas exitosamente.',
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
                                            'Órdenes listadas exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                orden_id: {
                                                    type: 'number',
                                                    example: 1
                                                },
                                                cliente_id: {
                                                    type: 'number',
                                                    example: 1
                                                },
                                                estado_id: {
                                                    type: 'number',
                                                    example: 10
                                                },
                                                direccion: {
                                                    type: 'string',
                                                    example: 'Calle 123'
                                                },
                                                telefono: {
                                                    type: 'string',
                                                    example: '12345678'
                                                },
                                                correo_electronico: {
                                                    type: 'string',
                                                    example: 'cliente@email.com'
                                                },
                                                fecha_entrega: {
                                                    type: 'string',
                                                    format: 'date',
                                                    example: '2024-12-09'
                                                },
                                                created_at: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example:
                                                        '2024-12-05T13:30:28.893Z'
                                                },
                                                updated_at: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example:
                                                        '2024-12-05T13:30:28.893Z'
                                                },
                                                total_orden: {
                                                    type: 'number',
                                                    example: 175
                                                },
                                                estado: {
                                                    type: 'string',
                                                    example: 'Aprobado'
                                                },
                                                cliente_nombre: {
                                                    type: 'string',
                                                    example:
                                                        'Juan Pérez modified'
                                                },
                                                detalle_orden: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            orden_detalle_id: {
                                                                type: 'number',
                                                                example: 1
                                                            },
                                                            producto_id: {
                                                                type: 'number',
                                                                example: 1
                                                            },
                                                            cantidad: {
                                                                type: 'number',
                                                                example: 2
                                                            },
                                                            precio: {
                                                                type: 'number',
                                                                example: 50
                                                            },
                                                            subtotal: {
                                                                type: 'number',
                                                                example: 100
                                                            }
                                                        }
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
                '404': {
                    description: 'No se encontraron órdenes.',
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
                                        example: 'No se encontraron órdenes.'
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
                                            'Error al listar órdenes: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al listar órdenes: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/orden/': {
        post: {
            summary: 'Crear una nueva orden',
            description:
                'Este endpoint permite crear una nueva orden en el sistema.',
            tags: ['Ordenes'],
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
                                cliente_id: {
                                    type: 'number',
                                    example: 8
                                },
                                direccion: {
                                    type: 'string',
                                    example: 'Calle Falsa 123'
                                },
                                telefono: {
                                    type: 'string',
                                    example: '123456789'
                                },
                                correo_electronico: {
                                    type: 'string',
                                    example: 'juan.perez@example.com'
                                },
                                fecha_entrega: {
                                    type: 'string',
                                    format: 'date',
                                    example: '2024-12-25'
                                },
                                orden_detalle: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            producto_id: {
                                                type: 'number',
                                                example: 2
                                            },
                                            cantidad: {
                                                type: 'number',
                                                example: 3
                                            },
                                            precio: {
                                                type: 'number',
                                                example: 50.0
                                            },
                                            subtotal: {
                                                type: 'number',
                                                example: 150.0
                                            }
                                        }
                                    }
                                }
                            },
                            required: [
                                'cliente_id',
                                'direccion',
                                'telefono',
                                'correo_electronico',
                                'fecha_entrega',
                                'orden_detalle'
                            ]
                        },
                        example: {
                            cliente_id: 1,
                            direccion: 'Calle 123',
                            telefono: '12345678',
                            correo_electronico: 'cliente@email.com',
                            fecha_entrega: '2024-12-10',
                            orden_detalle: [
                                {
                                    producto_id: 1,
                                    cantidad: 2,
                                    precio: 50.0,
                                    subtotal: 100.0
                                },
                                {
                                    producto_id: 2,
                                    cantidad: 1,
                                    precio: 75.0,
                                    subtotal: 75.0
                                }
                            ]
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Orden creada exitosamente.',
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
                                        example: 'Orden creada exitosamente.'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description:
                            'Error de validación, campos obligatorios faltantes.',
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
                                                'Todos los campos son obligatorios.'
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
                                                'Error al crear la orden: <detalle del error>'
                                        },
                                        error: {
                                            type: 'string',
                                            example:
                                                'Error al crear la orden: <detalle del error>'
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
    '/api/orden/aprobar/{orden_id}': {
        put: {
            summary: 'Aprobar una orden existente',
            description:
                'Este endpoint permite aprobar una orden en el sistema utilizando su ID.',
            tags: ['Ordenes'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'orden_id',
                    in: 'path',
                    required: true,
                    description: 'ID de la orden que se desea aprobar.',
                    schema: {
                        type: 'number',
                        example: 5
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Orden aprobada correctamente.',
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
                                        example: 'Orden aprobada correctamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación, ID de la orden faltante.',
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
                                            'El ID de la orden es obligatorio.'
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
                                            'Error al aprobar la orden: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al aprobar la orden: <detalle del error>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/orden/cancelar/{orden_id}': {
        put: {
            summary: 'Cancelar una orden existente',
            description:
                'Este endpoint permite cancelar una orden en el sistema utilizando su ID.',
            tags: ['Ordenes'],
            security: [
                {
                    cookieAuth: []
                }
            ],
            parameters: [
                {
                    name: 'orden_id',
                    in: 'path',
                    required: true,
                    description: 'ID de la orden que se desea cancelar.',
                    schema: {
                        type: 'number',
                        example: 5
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Orden cancelada correctamente.',
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
                                            'Orden Cancelada correctamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description:
                        'Error de validación, ID de la orden faltante.',
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
                                            'El ID de la orden es obligatorio.'
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
                                            'Error al cancelar la orden: <detalle del error>'
                                    },
                                    error: {
                                        type: 'string',
                                        example:
                                            'Error al cancelar la orden: <detalle del error>'
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
