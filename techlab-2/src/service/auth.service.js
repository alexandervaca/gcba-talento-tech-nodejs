import jwt from 'jsonwebtoken';

/**
 * Servicio para la lógica de autenticación
 */
class AuthService {
  /**
   * Autentica un usuario y genera un token JWT
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Token y datos del usuario
   */
  async login(email, password) {
    try {
      // Validar que se proporcionen credenciales
      if (!email || !password) {
        throw {
          statusCode: 400,
          message: 'Email y contraseña son requeridos'
        };
      }

      // En un entorno de producción, esto debería consultar una base de datos
      // Por ahora, usamos variables de entorno para las credenciales
      const validEmail = process.env.ADMIN_EMAIL || 'admin@techlab.com';
      const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

      // Verificar credenciales
      if (email !== validEmail || password !== validPassword) {
        throw {
          statusCode: 401,
          message: 'Credenciales inválidas'
        };
      }

      // Crear payload del token
      const payload = {
        email: email,
        role: 'admin',
        timestamp: Date.now()
      };

      // Generar token JWT
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      return {
        success: true,
        data: {
          token,
          user: {
            email: email,
            role: 'admin'
          }
        },
        message: 'Autenticación exitosa'
      };
    } catch (error) {
      if (error.statusCode === 400 || error.statusCode === 401) {
        throw error;
      }
      throw {
        statusCode: 500,
        message: 'Error al procesar la autenticación'
      };
    }
  }

  /**
   * Verifica si un token es válido
   * @param {string} token - Token JWT a verificar
   * @returns {Promise<Object>} Datos decodificados del token
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {
        success: true,
        data: decoded
      };
    } catch (error) {
      throw {
        statusCode: 401,
        message: 'Token inválido o expirado'
      };
    }
  }
}

export default new AuthService();

