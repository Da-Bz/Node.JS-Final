import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

// Middleware para proteger rutas que requieren autenticación
export const protect = (req, res, next) => {
    let token;

    // 1) Verificar si el token existe y está en el formato correcto
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('¡No has iniciado sesión! Por favor, inicia sesión para obtener acceso.', 401));
    }

    // 2) Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3) Otorgar acceso a la ruta protegida
        // En una aplicación real, adjuntarías el usuario al objeto de solicitud
        // Por ejemplo: req.user = decoded;
        next();

    } catch (err) {
        // Manejar diferentes errores de JWT
        if (err.name === 'JsonWebTokenError') {
            return next(new AppError('Token inválido. Por favor, inicia sesión de nuevo.', 401));
        }
        if (err.name === 'TokenExpiredError') {
            return next(new AppError('¡Tu token ha expirado! Por favor, inicia sesión de nuevo.', 401));
        }
        // Para otros errores, pasar al manejador de errores global
        return next(err);
    }
};
