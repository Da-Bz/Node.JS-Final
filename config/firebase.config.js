import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Usa un nombre de aplicación único para evitar conflictos
const APP_NAME = 'techlabfinal';

// Comprueba si la aplicación ya ha sido inicializada
const app = admin.apps.find(app => app.name === APP_NAME);

if (!app) {
  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'config', 'serviceAccountKey.json');
    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(`El archivo de clave de servicio no se encontró en: ${serviceAccountPath}`);
    }
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    }, APP_NAME);

    console.log('✅ Firebase ha sido inicializado con éxito.');

  } catch (error) {
    console.error('‼️ ERROR CRÍTICO AL INICIALIZAR FIREBASE ‼️', error);
    process.exit(1);
  }
}

// Exporta la instancia de la aplicación inicializada y nombrada
export default admin.app(APP_NAME);
