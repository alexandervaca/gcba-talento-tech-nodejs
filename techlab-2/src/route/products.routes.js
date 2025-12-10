import { Router } from 'express';
import productsController from '../controller/products.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestión de productos (requieren autenticación JWT)
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: prod1
 *                   title: Camiseta de algodón
 *                   price: 29.99
 *                   description: Camiseta 100% algodón
 *                   category: ropa
 *                   image: https://example.com/image.jpg
 *                   rating:
 *                     rate: 4.5
 *                     count: 120
 *               count: 1
 *       401:
 *         description: No autenticado - Token JWT requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Acceso denegado'
 *               message: 'No se proporcionó token de autenticación'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, productsController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto específico por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del producto
 *         example: prod123
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: prod123
 *                 title: Camiseta de algodón
 *                 price: 29.99
 *                 description: Camiseta 100% algodón
 *                 category: ropa
 *                 image: https://example.com/image.jpg
 *                 rating:
 *                   rate: 4.5
 *                   count: 120
 *       401:
 *         description: No autenticado - Token JWT requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Producto no encontrado'
 *               message: 'Producto con ID prod123 no encontrado'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authMiddleware, productsController.getProductById);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *           example:
 *             title: Camiseta de algodón
 *             price: 29.99
 *             description: Camiseta 100% algodón, disponible en varios colores
 *             category: ropa
 *             image: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *                   example: Producto creado exitosamente
 *             example:
 *               success: true
 *               data:
 *                 id: prod123
 *                 title: Camiseta de algodón
 *                 price: 29.99
 *                 description: Camiseta 100% algodón
 *                 category: ropa
 *                 image: https://example.com/image.jpg
 *                 rating:
 *                   rate: 0
 *                   count: 0
 *               message: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Error de validación'
 *               message: 'Datos incompletos. Se requieren: title, price y category'
 *       401:
 *         description: No autenticado - Token JWT requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/create', authMiddleware, productsController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del producto a eliminar
 *         example: prod123
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto con ID prod123 eliminado exitosamente
 *             example:
 *               success: true
 *               message: Producto con ID prod123 eliminado exitosamente
 *       401:
 *         description: No autenticado - Token JWT requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Producto no encontrado'
 *               message: 'Producto con ID prod123 no encontrado'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authMiddleware, productsController.deleteProduct);

export default router;

