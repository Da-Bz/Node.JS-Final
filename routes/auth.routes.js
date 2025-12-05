import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta para iniciar sesión
// POST /auth/login
router.post('/login', login);

export default router;
