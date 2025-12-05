import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import path from 'path';

import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import AppError from './utils/AppError.js';

const app = express();

// Middlewares esenciales
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta principal que sirve el archivo HTML estático.
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  next(new AppError(`No se pudo encontrar ${req.originalUrl} en este servidor.`, 404));
});

// Middleware global para el manejo de errores.
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
