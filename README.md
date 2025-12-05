API REST para E-commerce con Node.js y Firebase 🔥

Proyecto final desarrollado para la cursada de Node.JS – Talento Tech.
Alumno: BLANEZ, Damian

🚀 Tecnologías Utilizadas

Node.js – Entorno de ejecución del servidor.

Express.js – Framework para definir rutas, middlewares y servidor.

Firebase Admin SDK – Conexión segura con Firebase desde el backend.

Cloud Firestore – Base de datos NoSQL en la nube.

JWT (JSON Web Token) – Protección de rutas privadas.

dotenv – Manejo de variables de entorno (.env).

CORS – Permite peticiones desde Frontend externos.

ES Modules – Uso nativo de import/export.

🔧 Funcionalidades Principales
✔ Arquitectura modular

Separación en:

Rutas

Controladores

Servicios

Modelos

Middlewares

Configuración

✔ Endpoints CRUD de productos
Método	Ruta	Descripción	Protegida
GET	/api/products	Obtiene todos los productos	❌
GET	/api/products/:id	Obtiene un producto por ID	❌
POST	/api/products/create	Crea un producto	✔
PUT	/api/products/:id	Actualiza un producto	✔
DELETE	/api/products/:id	Elimina un producto	✔
✔ Autenticación con JWT

Ruta de login:

POST /api/auth/login


Recibe credenciales (simuladas).

Si son correctas → devuelve un Bearer Token.

Ese token se debe enviar en:

Authorization: Bearer TU_TOKEN


El middleware authMiddleware verifica el token para permitir crear, editar o eliminar productos.

✔ Manejo centralizado de errores

Se utiliza un middleware errorHandler que:

Captura errores de controladores y servicios

Devuelve respuestas formateadas

Maneja errores 400, 401, 403, 404 y 500

▶️ Cómo Ejecutar el Proyecto
1. Clonar el repositorio
git clone https://github.com/Da-Bz/Node.JS-Final.git
cd Node.JS-Final

2. Instalar dependencias
npm install

3. Configurar variables de entorno
A. Generar clave de servicio de Firebase:

Firebase → Configuración del proyecto

Cuentas de servicio

“Generar nueva clave privada”

Guardar el archivo dentro de:

/config/serviceAccountKey.json

B. Crear archivo .env

Crear .env en la raíz:

JWT_SECRET=tu_clave_secreta_super_dificil


⚠️ Ambos archivos (.env y serviceAccountKey.json) ya están ignorados en .gitignore.

4. Ejecutar el servidor
npm run dev


Servidor disponible en:

http://localhost:3000

🛑 Sobre npm test

Este proyecto no incluye tests automatizados, por lo tanto:

npm test


no está configurado.

🧪 Cómo Probar la API
1️⃣ Login (obtener token)
POST /api/auth/login


Body:

{
  "email": "admin@example.com",
  "password": "admin123"
}


Respuesta:

{
  "token": "TOKEN_AQUI"
}

2️⃣ Crear producto (protegido)
POST /api/products/create


Header:

Authorization: Bearer TOKEN_AQUI


Body:

{
  "nombre": "Laptop Pro",
  "precio": 1200,
  "stock": 15,
  "descripcion": "Laptop de alto rendimiento",
  "categoria": "Electrónica"
}

3️⃣ Rutas públicas

GET /api/products

GET /api/products/:id

4️⃣ Editar producto
PUT /api/products/:id
Authorization: Bearer TOKEN

5️⃣ Eliminar producto
DELETE /api/products/:id
Authorization: Bearer TOKEN

✔ Proyecto funcionando correctamente 🎉
