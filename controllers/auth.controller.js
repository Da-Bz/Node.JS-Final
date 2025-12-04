import admin from '../config/firebase.config.js';
import { generateToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';

export const register = async (req, res, next) => {
  try {
    const auth = admin.auth();

    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('El correo electrónico y la contraseña son obligatorios', 400);
    }
    
    const userRecord = await auth.createUser({
        email: email,
        password: password,
    });

    const token = generateToken({ uid: userRecord.uid });
    
    res.status(201).json({ token });

  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
        return next(new AppError('El correo electrónico ya está en uso', 409));
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
    next(new AppError('La funcionalidad de login está temporalmente desactivada', 503));
};
