
import AppError from '../utils/AppError.js';

const handleJWTError = () => new AppError('Token inválido. Por favor, inicia sesión de nuevo.', 401);
const handleJWTExpiredError = () => new AppError('Tu token ha expirado. Por favor, inicia sesión de nuevo.', 401);

// Middleware de Manejo de Errores Centralizado
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Manejar errores específicos de JWT
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Por defecto, error interno del servidor 500 si no se establece ningún estado
  const statusCode = error.statusCode || 500;

  // Registrar el error para fines de depuración
  console.error({
    message: error.message,
    stack: error.stack,
    statusCode: statusCode,
    path: req.path,
    method: req.method,
  });

  // Enviar una respuesta de error JSON estructurada
  res.status(statusCode).json({
    status: error.status || 'error',
    message: error.message || 'Ocurrió un error interno en el servidor.',
  });
};

// Maneja los errores 404 No Encontrado para rutas no definidas
const notFoundHandler = (req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
};

export { errorHandler, notFoundHandler };
