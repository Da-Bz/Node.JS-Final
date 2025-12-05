import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

// Genera un token JWT firmado con el UID del usuario de Firebase.
export const generateToken = ({ uid }) => {
  if (!uid) {
    throw new Error('Se requiere el UID para generar el token');
  }
  return jwt.sign(
    { uid }, // Usamos el UID de Firebase como payload
    JWT_SECRET,
    { expiresIn: '1h' } // El token expira en 1 hora
  );
};