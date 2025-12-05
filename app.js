import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/AppError.js';
import { globalErrorHandler } from './controllers/error.controller.js';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import userRoutes from './routes/user.routes.js'; // Nuevas Rutas de Usuario

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// --- Rutas de la API ---
app.get('/api', (req, res) => {
  res.json({ 
    message: '¡Bienvenido a la API!',
    version: '1.0.0',
    documentation: 'Visita /api-docs para la documentación' // Marcador de posición
  });
});

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Usando las nuevas rutas de usuario


// --- Manejo de Errores ---
// Manejar todas las rutas no encontradas
app.all('*', (req, res, next) => {
  next(new AppError(`¡No se puede encontrar ${req.originalUrl} en este servidor!`, 404));
});

// Middleware de manejo de errores global
app.use(globalErrorHandler);

// --- Inicio del Servidor ---
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
