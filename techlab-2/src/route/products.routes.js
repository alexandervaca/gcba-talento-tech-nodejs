import { Router } from 'express';
import productsController from '../controller/products.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas para gestión de productos
 * Todas las rutas requieren autenticación mediante JWT
 */

// GET /api/products - Obtener todos los productos
router.get('/', authMiddleware, productsController.getAllProducts);

// GET /api/products/:id - Obtener un producto específico
router.get('/:id', authMiddleware, productsController.getProductById);

// POST /api/products/create - Crear un nuevo producto
router.post('/create', authMiddleware, productsController.createProduct);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', authMiddleware, productsController.deleteProduct);

export default router;

