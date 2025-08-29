import swaggerJSDoc from 'swagger-jsdoc';
import config from './config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks Lite API',
      version: '1.0.0',
      description: 'A simple Task Management API with JWT Authentication',
      contact: {
        name: 'API Support',
        email: 'support@taskslite.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token (without "Bearer " prefix - Swagger adds this automatically)'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'User password (hashed)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation date'
            }
          }
        },
        Task: {
          type: 'object',
          required: ['title', 'description', 'userId'],
          properties: {
            id: {
              type: 'string',
              description: 'Task ID'
            },
            title: {
              type: 'string',
              description: 'Task title'
            },
            description: {
              type: 'string',
              description: 'Task description'
            },
            completed: {
              type: 'boolean',
              default: false,
              description: 'Task completion status'
            },
            userId: {
              type: 'string',
              description: 'ID of the user who owns this task'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation date'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task last update date'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Error message'
                }
              }
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User last name',
              example: 'Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (minimum 6 characters)',
              example: 'password123'
            }
          }
        },
        TaskCreateRequest: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: {
              type: 'string',
              description: 'Task title',
              example: 'Complete project documentation'
            },
            description: {
              type: 'string',
              description: 'Task description',
              example: 'Write comprehensive documentation for the project'
            }
          }
        },
        TaskUpdateRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Task title',
              example: 'Complete project documentation'
            },
            description: {
              type: 'string',
              description: 'Task description',
              example: 'Write comprehensive documentation for the project'
            },
            completed: {
              type: 'boolean',
              description: 'Task completion status',
              example: false
            }
          }
        },
        AuthResponse: {
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
                  description: 'JWT token'
                },
                user: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        TaskResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              $ref: '#/components/schemas/Task'
            }
          }
        },
        TasksResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Task'
              }
            },
            count: {
              type: 'integer',
              description: 'Number of tasks returned'
            }
          }
        },
        UserProfileResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        DeleteResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Task deleted successfully'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js', './server.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

export default specs;
