import productsService from '../service/products.service.js';

/**
 * Controlador para manejar las peticiones relacionadas con productos
 */
class ProductsController {
  /**
   * Obtiene todos los productos
   * GET /api/products
   */
  async getAllProducts(req, res, next) {
    try {
      const result = await productsService.getAllProducts();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene un producto por su ID
   * GET /api/products/:id
   */
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productsService.getProductById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea un nuevo producto
   * POST /api/products/create
   */
  async createProduct(req, res, next) {
    try {
      const productData = req.body;
      const result = await productsService.createProduct(productData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina un producto
   * DELETE /api/products/:id
   */
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productsService.deleteProduct(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();

