
// Clase de error personalizada para crear errores estructurados con códigos de estado
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // 'fail' para códigos 4xx, 'error' para códigos 5xx
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Asegurar que este error sea operativo (no un error de programación)
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
