import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  deleteDoc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase.config.js';

const COLLECTION_NAME = 'productos';

/**
 * Modelo para gestionar productos en Firestore
 */
class ProductsModel {
  /**
   * Obtiene todos los productos de la base de datos
   * @returns {Promise<Array>} Lista de productos
   */
  async getAll() {
    try {
      // Validar que db esté inicializado
      if (!db) {
        throw new Error('Firebase no está inicializado. Verifica tu configuración en .env');
      }

      const productsRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(productsRef);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return products;
    } catch (error) {
      console.error('❌ Error al obtener productos:', error.message);
      if (error.code === 'invalid-argument') {
        throw new Error('Error de configuración de Firebase. Verifica las credenciales en .env');
      }
      throw new Error(`Error al consultar la base de datos: ${error.message}`);
    }
  }

  /**
   * Obtiene un producto por su ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object|null>} Producto encontrado o null
   */
  async getById(id) {
    try {
      if (!db) {
        throw new Error('Firebase no está inicializado. Verifica tu configuración en .env');
      }

      const productRef = doc(db, COLLECTION_NAME, id);
      const productDoc = await getDoc(productRef);
      
      if (!productDoc.exists()) {
        return null;
      }
      
      return {
        id: productDoc.id,
        ...productDoc.data()
      };
    } catch (error) {
      console.error('❌ Error al obtener producto por ID:', error.message);
      throw new Error(`Error al consultar la base de datos: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo producto en la base de datos
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado con su ID
   */
  async create(productData) {
    try {
      if (!db) {
        throw new Error('Firebase no está inicializado. Verifica tu configuración en .env');
      }

      const productsRef = collection(db, COLLECTION_NAME);
      
      const newProduct = {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(productsRef, newProduct);
      
      return {
        id: docRef.id,
        ...productData
      };
    } catch (error) {
      console.error('❌ Error al crear producto:', error.message);
      throw new Error(`Error al guardar en la base de datos: ${error.message}`);
    }
  }

  /**
   * Actualiza un producto existente
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>} Producto actualizado
   */
  async update(id, productData) {
    try {
      if (!db) {
        throw new Error('Firebase no está inicializado. Verifica tu configuración en .env');
      }

      const productRef = doc(db, COLLECTION_NAME, id);
      
      // Verificar si existe
      const productDoc = await getDoc(productRef);
      if (!productDoc.exists()) {
        throw new Error('Producto no encontrado');
      }
      
      const updatedData = {
        ...productData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(productRef, updatedData);
      
      return {
        id,
        ...productData
      };
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error.message);
      throw error;
    }
  }

  /**
   * Elimina un producto de la base de datos
   * @param {string} id - ID del producto a eliminar
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async delete(id) {
    try {
      if (!db) {
        throw new Error('Firebase no está inicializado. Verifica tu configuración en .env');
      }

      const productRef = doc(db, COLLECTION_NAME, id);
      
      // Verificar si existe
      const productDoc = await getDoc(productRef);
      if (!productDoc.exists()) {
        throw new Error('Producto no encontrado');
      }
      
      await deleteDoc(productRef);
      return true;
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error.message);
      throw error;
    }
  }
}

export default new ProductsModel();

