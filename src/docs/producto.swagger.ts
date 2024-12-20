export const productoDocs = {
    '/api/producto': {
        get: {
            summary: 'Listar productos por estado',
            description: 'Obtiene un listado de productos filtrado por estado.',
            tags: ['Productos'],
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
                        type: 'number'
                    },
                    description:
                        'ID del estado para filtrar los productos. Si no se proporciona, se listarán todos los productos.'
                }
            ],
            responses: {
                '200': {
                    description: 'Listado de productos obtenido exitosamente.',
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
                                            'Productos listados exitosamente.'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                producto_id: {
                                                    type: 'number',
                                                    example: 7
                                                },
                                                categoria_producto_id: {
                                                    type: 'number',
                                                    example: 2
                                                },
                                                estado_id: {
                                                    type: 'number',
                                                    example: 4
                                                },
                                                nombre: {
                                                    type: 'string',
                                                    example:
                                                        'Auriculares Sony WH-1000XM4'
                                                },
                                                marca: {
                                                    type: 'string',
                                                    example: 'Sony'
                                                },
                                                codigo: {
                                                    type: 'string',
                                                    example: 'AUR-SONY-007'
                                                },
                                                stock: {
                                                    type: 'number',
                                                    example: 58
                                                },
                                                precio: {
                                                    type: 'number',
                                                    example: 2500
                                                },
                                                url_imagen: {
                                                    type: 'string',
                                                    example:
                                                        'https://example.com/auriculares.jpg'
                                                },
                                                nombre_estado: {
                                                    type: 'string',
                                                    example: 'Disponible'
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
                                            'Error al listar productos: <detalle del error>'
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
    '/api/producto/': {
        post: {
            summary: 'Crear un nuevo producto',
            description:
                'Permite la creación de un nuevo producto en el sistema.',
            tags: ['Productos'],
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
                                categoria_producto_id: {
                                    type: 'number',
                                    example: 1,
                                    description:
                                        'ID de la categoría del producto.'
                                },
                                estado_id: {
                                    type: 'number',
                                    example: 1,
                                    description: 'ID del estado del producto.'
                                },
                                nombre: {
                                    type: 'string',
                                    example: 'Producto A',
                                    description: 'Nombre del producto.'
                                },
                                marca: {
                                    type: 'string',
                                    example: 'Marca A',
                                    description: 'Marca del producto.'
                                },
                                codigo: {
                                    type: 'string',
                                    example: 'COD-001',
                                    description: 'Código único del producto.'
                                },
                                stock: {
                                    type: 'number',
                                    example: 100,
                                    description:
                                        'Cantidad de producto disponible en stock.'
                                },
                                precio: {
                                    type: 'number',
                                    example: 150.0,
                                    description: 'Precio del producto.'
                                },
                                url_imagen: {
                                    type: 'string',
                                    example: 'http://example.com/imagen.jpg',
                                    description:
                                        'URL de la imagen del producto.'
                                }
                            },
                            required: [
                                'categoria_producto_id',
                                'estado_id',
                                'nombre',
                                'precio'
                            ]
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Producto creado exitosamente.',
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
                                        example: 'Producto creado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error en los parámetros de la solicitud.',
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
                                            'Los campos categoría, estado, nombre y precio son obligatorios.'
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
                                            'Error al crear el producto: <detalle del error>'
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
    '/api/producto/{id}': {
        put: {
            summary: 'Actualizar un producto',
            description:
                'Permite actualizar la información de un producto existente en el sistema.',
            tags: ['Productos'],
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
                    description: 'ID del producto que se desea actualizar.',
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
                                categoria_producto_id: {
                                    type: 'number',
                                    example: 3,
                                    description:
                                        'ID de la categoría del producto.'
                                },
                                estado_id: {
                                    type: 'number',
                                    example: 2,
                                    description: 'ID del estado del producto.'
                                },
                                nombre: {
                                    type: 'string',
                                    example: 'Producto Actualizado',
                                    description: 'Nombre del producto.'
                                },
                                marca: {
                                    type: 'string',
                                    example: 'Marca XYZ',
                                    description: 'Marca del producto.'
                                },
                                codigo: {
                                    type: 'string',
                                    example: '123456',
                                    description: 'Código único del producto.'
                                },
                                stock: {
                                    type: 'number',
                                    example: 50,
                                    description: 'Cantidad de stock disponible.'
                                },
                                precio: {
                                    type: 'number',
                                    example: 199.99,
                                    description: 'Precio del producto.'
                                },
                                url_imagen: {
                                    type: 'string',
                                    example: 'http://ejemplo.com/imagen.jpg',
                                    description:
                                        'URL de la imagen del producto.'
                                }
                            },
                            required: [
                                'categoria_producto_id',
                                'estado_id',
                                'nombre',
                                'precio'
                            ]
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description:
                        'El producto ha sido actualizado exitosamente.',
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
                                            'Producto actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error en los parámetros de la solicitud.',
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
                                            'Los campos ID, categoría, estado, nombre y precio son obligatorios.'
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
                                            'Error al actualizar el producto: <detalle del error>'
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
    '/api/producto/estado/{id}': {
        put: {
            summary: 'Actualizar el estado de un producto',
            description:
                'Permite actualizar el estado de un producto existente en el sistema.',
            tags: ['Productos'],
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
                    description:
                        'ID del producto cuyo estado se desea actualizar.',
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
                                estado_id: {
                                    type: 'number',
                                    example: 2,
                                    description:
                                        'ID del nuevo estado del producto.'
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
                        'El estado del producto ha sido actualizado exitosamente.',
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
                                            'El estado del producto ha sido actualizado exitosamente.'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error en los parámetros de la solicitud.',
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
                                            'El ID del producto y el ID del estado son obligatorios.'
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
                                            'Error al actualizar el estado del producto: <detalle del error>'
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
