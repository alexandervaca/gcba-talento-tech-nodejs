import authService from '../service/auth.service.js';

/**
 * Controlador para manejar las peticiones de autenticación
 */
class AuthController {
  /**
   * Maneja el login de usuarios
   * POST /auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifica el token actual
   * GET /auth/verify
   */
  async verifyToken(req, res, next) {
    try {
      // El token ya fue verificado por el middleware authMiddleware
      res.status(200).json({
        success: true,
        data: req.user,
        message: 'Token válido'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

