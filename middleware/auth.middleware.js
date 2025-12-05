import jwt from 'jsonwebtoken';
import admin from '../config/firebase.config.js';
import AppError from '../utils/AppError.js';

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Verificar si el token existe y tiene el formato correcto
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No estás autorizado. Se requiere un token.', 401));
  }

  try {
    // 2. Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Verificar si el usuario aún existe en Firebase
    const userRecord = await admin.auth().getUser(decoded.uid);

    if (!userRecord) {
        return next(new AppError('El usuario perteneciente a este token ya no existe.', 401));
    }

    // 4. Adjuntar el usuario al objeto de la solicitud
    req.user = userRecord;

    next();
  } catch (error) {
    return next(new AppError('Token inválido o expirado.', 401));
  }
};

export default authMiddleware;
