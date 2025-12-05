import AppError from '../utils/AppError.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Para errores inesperados, un mensaje genérico.
  return res.status(500).json({
    status: 'error',
    message: 'Algo salió muy mal en el servidor.'
  });
};

export default errorMiddleware;
