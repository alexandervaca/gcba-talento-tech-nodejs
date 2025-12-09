/**
 * Middleware para manejar rutas no encontradas (404)
 * @param {Object} req - Objeto de petición Express
 * @param {Object} res - Objeto de respuesta Express
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.path} no existe`,
    timestamp: new Date().toISOString()
  });
};

/**
 * Middleware global para manejo de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de petición Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error capturado:', err);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error de autenticación JWT
  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'No autorizado',
      message: 'Token de autenticación inválido o expirado',
      timestamp: new Date().toISOString()
    });
  }

  // Error de permisos
  if (err.statusCode === 403) {
    return res.status(403).json({
      error: 'Acceso prohibido',
      message: err.message || 'No tiene permisos para realizar esta acción',
      timestamp: new Date().toISOString()
    });
  }

  // Error de recurso no encontrado
  if (err.statusCode === 404) {
    return res.status(404).json({
      error: 'Recurso no encontrado',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error de solicitud incorrecta
  if (err.statusCode === 400) {
    return res.status(400).json({
      error: 'Solicitud incorrecta',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error del servidor (500)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Error interno del servidor' : 'Error',
    message: process.env.NODE_ENV === 'development' ? message : 'Ha ocurrido un error inesperado',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};

