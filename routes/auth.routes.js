import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para el inicio de sesión del usuario
// POST /api/auth/login
router.post('/login', login);

// Ruta para el registro de usuarios
// POST /api/auth/register
router.post('/register', register);

export default router;
