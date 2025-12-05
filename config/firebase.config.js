import admin from 'firebase-admin';
import 'dotenv/config';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn(
    '[ADVERTENCIA] La variable GOOGLE_APPLICATION_CREDENTIALS no está definida.\n' +
    'Firebase Admin intentará inicializarse, pero puede fallar si no encuentra las credenciales.'
  );
}

try {
  admin.initializeApp();
  console.log('Firebase Admin SDK inicializado correctamente.');
} catch (error) {
  console.error('Error inicializando Firebase Admin SDK:', error);
  process.exit(1);
}

export default admin;
