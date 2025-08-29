import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import config from './config/config.js';

const app = express();
const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers (simple implementation)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.CORS_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
/**
 * @swagger
 * /:
 *   get:
 *     summary: API Information
 *     description: Returns basic information about the Tasks Lite API
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 express:
 *                   type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 endpoints:
 *                   type: object
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tasks Lite API Server',
    version: '1.0.0',
    express: '5.1.0',
    features: ['JWT Authentication', 'User Management', 'Task Management'],
    endpoints: {
      auth: [
        'POST /api/users/register',
        'POST /api/users/login',
        'GET /api/users/profile (protected)'
      ],
      tasks: [
        'GET /api/tasks (protected)',
        'POST /api/tasks (protected)',
        'GET /api/tasks/:id (protected)',
        'PUT /api/tasks/:id (protected)',
        'DELETE /api/tasks/:id (protected)'
      ]
    }
  });
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Tasks Lite API Documentation'
}));

app.use('/api', routes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to see the API`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🔒 JWT Authentication enabled`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
});

export default app;
