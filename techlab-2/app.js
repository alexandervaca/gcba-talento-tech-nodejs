import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Importar rutas
import productsRoutes from './src/route/products.routes.js';
import authRoutes from './src/route/auth.routes.js';

// Importar middlewares
import { notFoundHandler, errorHandler } from './src/middleware/error.middleware.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.config.js';


// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;


// ============================================
// MIDDLEWARES GLOBALES
// ============================================

// 1. CORS - Habilitar peticiones de origen cruzado
app.use(cors({
  origin: '*', // En producción, especificar orígenes permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Body Parser - Interpretar JSON en el body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Logger simple - Registrar todas las peticiones
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// RUTA PRINCIPAL
// ============================================

app.get('/', (req, res) => {
  res.json({
    message: '🚀 API de Productos - TechLab',
    version: '1.0.0',
    documentation: {
      swagger: `http://localhost:${PORT}/api-docs`,
      description: 'Documentación interactiva de la API'
    },
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        verify: 'GET /auth/verify'
      },
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:id',
        create: 'POST /api/products/create',
        delete: 'DELETE /api/products/:id'
      }
    },
    documentation: 'Ver README.md para más información'
  });
});

// ============================================
// SWAGGER-UI - Documentación de la API
// IMPORTANTE: Debe estar ANTES del notFoundHandler
// ============================================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'TechLab API Documentation',
  customfavIcon: '/favicon.ico'
}));

// ============================================
// RUTAS DE LA API
// ============================================

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de productos (protegidas con JWT)
app.use('/api/products', productsRoutes);

// ============================================
// MANEJO DE ERRORES
// ============================================

// Middleware para rutas no encontradas (404)
// IMPORTANTE: Debe estar al final, después de todas las rutas
app.use(notFoundHandler);

// Middleware global de manejo de errores
app.use(errorHandler);

// ============================================


// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log(`║  🚀 Servidor corriendo en puerto ${PORT}  ║`);
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log('📡 Endpoints disponibles:');
  console.log(`   → http://localhost:${PORT}/`);
  console.log(`   → http://localhost:${PORT}/auth/login`);
  console.log(`   → http://localhost:${PORT}/api/products`);
  console.log(`   → http://localhost:${PORT}/api-docs (Swagger UI)`);
  console.log('');
  console.log('⚠️  Recuerda configurar el archivo .env antes de usar Firebase');
  console.log('');
});

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Error no manejado (Promise):', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada:', error);
  process.exit(1);
});

export default app;
