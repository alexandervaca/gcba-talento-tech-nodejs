import productsModel from '../model/products.model.js';

/**
 * Servicio para la lógica de negocio de productos
 */
class ProductsService {
  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>} Lista de productos
   */
  async getAllProducts() {
    try {
      const products = await productsModel.getAll();
      return {
        success: true,
        data: products,
        count: products.length
      };
    } catch (error) {
      throw {
        statusCode: 500,
        message: 'Error al obtener productos desde el servicio de datos'
      };
    }
  }

  /**
   * Obtiene un producto por su ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object>} Producto encontrado
   */
  async getProductById(id) {
    try {
      const product = await productsModel.getById(id);
      
      if (!product) {
        throw {
          statusCode: 404,
          message: `Producto con ID ${id} no encontrado`
        };
      }
      
      return {
        success: true,
        data: product
      };
    } catch (error) {
      if (error.statusCode === 404) {
        throw error;
      }
      throw {
        statusCode: 500,
        message: 'Error al obtener el producto desde el servicio de datos'
      };
    }
  }

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async createProduct(productData) {
    try {
      // Validar datos requeridos
      const { title, price, description, category, image } = productData;
      
      if (!title || !price || !category) {
        throw {
          statusCode: 400,
          message: 'Datos incompletos. Se requieren: title, price y category'
        };
      }

      // Validar tipos de datos
      if (typeof price !== 'number' || price <= 0) {
        throw {
          statusCode: 400,
          message: 'El precio debe ser un número mayor a 0'
        };
      }

      const newProduct = {
        title,
        price,
        description: description || '',
        category,
        image: image || '',
        rating: {
          rate: 0,
          count: 0
        }
      };

      const createdProduct = await productsModel.create(newProduct);
      
      return {
        success: true,
        data: createdProduct,
        message: 'Producto creado exitosamente'
      };
    } catch (error) {
      if (error.statusCode === 400) {
        throw error;
      }
      throw {
        statusCode: 500,
        message: 'Error al crear el producto en el servicio de datos'
      };
    }
  }

  /**
   * Elimina un producto
   * @param {string} id - ID del producto
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async deleteProduct(id) {
    try {
      await productsModel.delete(id);
      
      return {
        success: true,
        message: `Producto con ID ${id} eliminado exitosamente`
      };
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        throw {
          statusCode: 404,
          message: `Producto con ID ${id} no encontrado`
        };
      }
      throw {
        statusCode: 500,
        message: 'Error al eliminar el producto del servicio de datos'
      };
    }
  }
}

export default new ProductsService();

