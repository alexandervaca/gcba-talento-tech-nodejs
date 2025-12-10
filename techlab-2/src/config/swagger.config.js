import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechLab API - Productos',
      version: '1.0.0',
      description: 'API REST para gestión de productos con autenticación JWT y Firebase',
      contact: {
        name: 'TechLab',
        email: 'support@techlab.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://api.techlab.com',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT obtenido del endpoint /auth/login'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Tipo de error'
            },
            message: {
              type: 'string',
              description: 'Mensaje descriptivo del error'
            }
          },
          example: {
            error: 'Acceso denegado',
            message: 'No se proporcionó token de autenticación'
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'usuario@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario',
              example: 'password123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token JWT para autenticación',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                user: {
                  type: 'object',
                  properties: {
                    uid: {
                      type: 'string',
                      example: 'user123'
                    },
                    email: {
                      type: 'string',
                      example: 'usuario@example.com'
                    }
                  }
                }
              }
            },
            message: {
              type: 'string',
              example: 'Login exitoso'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único del producto',
              example: 'prod123'
            },
            title: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Camiseta de algodón'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Precio del producto',
              example: 29.99
            },
            description: {
              type: 'string',
              description: 'Descripción del producto',
              example: 'Camiseta 100% algodón, disponible en varios colores'
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'ropa'
            },
            image: {
              type: 'string',
              format: 'uri',
              description: 'URL de la imagen del producto',
              example: 'https://example.com/image.jpg'
            },
            rating: {
              type: 'object',
              properties: {
                rate: {
                  type: 'number',
                  format: 'float',
                  example: 4.5
                },
                count: {
                  type: 'number',
                  example: 120
                }
              }
            }
          }
        },
        ProductCreate: {
          type: 'object',
          required: ['title', 'price', 'category'],
          properties: {
            title: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Camiseta de algodón'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Precio del producto (debe ser mayor a 0)',
              example: 29.99
            },
            description: {
              type: 'string',
              description: 'Descripción del producto (opcional)',
              example: 'Camiseta 100% algodón'
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'ropa'
            },
            image: {
              type: 'string',
              format: 'uri',
              description: 'URL de la imagen del producto (opcional)',
              example: 'https://example.com/image.jpg'
            }
          }
        },
        ProductsResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product'
              }
            },
            count: {
              type: 'number',
              description: 'Cantidad de productos',
              example: 10
            }
          }
        },
        ProductResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              $ref: '#/components/schemas/Product'
            }
          }
        },
        VerifyResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                uid: {
                  type: 'string',
                  example: 'user123'
                },
                email: {
                  type: 'string',
                  example: 'usuario@example.com'
                }
              }
            },
            message: {
              type: 'string',
              example: 'Token válido'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints para autenticación de usuarios'
      },
      {
        name: 'Products',
        description: 'Endpoints para gestión de productos (requieren autenticación)'
      }
    ]
  },
  apis: [
    './src/route/*.js',  // Ruta donde buscarán las anotaciones JSDoc
    './app.js'           // También buscar en app.js si hay documentación
  ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;