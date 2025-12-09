import { Router } from 'express';
import authController from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas para autenticación
 */

// POST /auth/login - Autenticar usuario y obtener token
router.post('/login', authController.login);

// GET /auth/verify - Verificar si el token es válido (requiere autenticación)
router.get('/verify', authMiddleware, authController.verifyToken);

export default router;

