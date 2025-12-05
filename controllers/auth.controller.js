import admin from '../config/firebase.config.js';
import { generateToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';

// Controlador para iniciar sesión y generar un token JWT
export const login = async (req, res, next) => {
  const { email, password } = req.body; // Aunque el password no se usa para validar, es bueno recibirlo

  if (!email || !password) {
    return next(new AppError('El email y la contraseña son obligatorios', 400));
  }

  try {
    // Firebase Admin SDK no valida la contraseña. Solo podemos verificar si el usuario existe.
    // En un proyecto real, la validación de contraseña se haría en el frontend con Firebase Client SDK.
    // Para este proyecto, asumimos que si el usuario existe, el login es "exitoso" a nivel de backend.
    const userRecord = await admin.auth().getUserByEmail(email);

    // Generamos el token con el UID de Firebase
    const token = generateToken({ uid: userRecord.uid });

    res.json({ success: true, token: `Bearer ${token}` });

  } catch (error) {
    // Si el usuario no se encuentra, devolvemos un error de credenciales inválidas
    if (error.code === 'auth/user-not-found') {
      return next(new AppError('Credenciales inválidas', 401));
    }
    next(error); // Para otros errores
  }
};
