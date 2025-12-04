import express from 'express';
import 'dotenv/config';
import cors from 'cors';

// --- INICIALIZACIÓN DE FIREBASE ---
// Importa el archivo de configuración para asegurar que Firebase se inicialice al inicio.
import './config/firebase.config.js';
// --------------------------------

// Importar enrutadores
import authRouter from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';

// Importar middleware de manejo de errores
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// Habilitar CORS para todas las rutas y orígenes
app.use(cors());

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  const name = process.env.NAME || 'Mundo';
  res.send(`¡Hola ${name}!`);
});

// === Rutas de la API ===
// Usar el enrutador de autenticación para todas las solicitudes /api/auth
app.use('/api/auth', authRouter);
// Usar el enrutador de productos para todas las solicitudes /api/products
app.use('/api/products', productsRouter);


// === Manejo de Errores ===
// Capturar todas las rutas no definidas
app.use(notFoundHandler);
// Manejador de errores centralizado
app.use(errorHandler);

// Función para obtener el puerto de los argumentos de la línea de comandos
const getPortFromArgs = () => {
  const portArg = process.argv.find(arg => arg.startsWith('--port'));
  if (portArg) {
    const portValue = portArg.split('=')[1] || process.argv[process.argv.indexOf(portArg) + 1];
    return parseInt(portValue, 10);
  }
  return null;
};

const port = getPortFromArgs() || parseInt(process.env.PORT) || 3001;

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const gracefulShutdown = () => {
  console.log('Cerrando el servidor de forma elegante...');
  server.close(() => {
    console.log('Servidor cerrado.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
