import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

async function testFirebase() {
  console.log('--- INICIANDO PRUEBA AISLADA DE FIREBASE ---');

  try {
    // 1. LEER LA CLAVE DE SERVICIO
    const serviceAccountPath = path.resolve(process.cwd(), 'config', 'serviceAccountKey.json');
    console.log(`Leyendo la clave desde: ${serviceAccountPath}`);
    const serviceAccountRaw = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountRaw);
    console.log('Clave de servicio leída y parseada con éxito.');

    // 2. INICIALIZAR FIREBASE
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase App inicializada por primera vez.');
    } else {
        console.log('Firebase App ya estaba inicializada.');
    }

    // 3. INTENTAR CREAR UN USUARIO
    const email = `test.user.${Date.now()}@example.com`;
    const password = 'password123';
    console.log(`Intentando crear usuario con email: ${email}`);

    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });

    console.log('-------------------------------------------------');
    console.log('✅ ÉXITO: Usuario creado con UID:', userRecord.uid);
    console.log('-------------------------------------------------');

    // Limpieza: eliminar el usuario recién creado
    await admin.auth().deleteUser(userRecord.uid);
    console.log('Usuario de prueba eliminado para limpieza.');

  } catch (error) {
    console.log('-------------------------------------------------');
    console.error('❌ ERROR DURANTE LA PRUEBA AISLADA:');
    console.error('Código:', error.code);
    console.error('Mensaje:', error.message);
    console.log('-------------------------------------------------');
  }
}

testFirebase();
