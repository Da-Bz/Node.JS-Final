API REST para E-commerce con Node.JS y Firebase 🔥
Este proyecto es el backend para una tienda online, desarrollado como proyecto final para la cursada de Node.JS en Talento Tech.

Alumno: BLANEZ, Damian
🚀 Tecnologías Utilizadas
Se utilizaron las siguientes tecnologías y herramientas para construir esta API:

Node.js: Entorno de ejecución para JavaScript del lado del servidor.
Express.js: Framework para la construcción de la API, manejo de rutas y middlewares.
Firebase Admin SDK: Para la conexión segura y la interacción con los servicios de Firebase desde el servidor.
Cloud Firestore: Base de datos NoSQL en la nube para el almacenamiento y gestión de los productos.
JSON Web Token (JWT): Para la protección de rutas mediante tokens de autenticación.
Dotenv: Para el manejo de variables de entorno y protección de claves secretas.
ES Modules: Uso de la sintaxis moderna de import/export en todo el proyecto.
🔧 Características del Proyecto
Arquitectura Modular: El código está organizado en rutas, controladores y middlewares para una mejor mantenibilidad.
Endpoints CRUD para Productos:
GET /api/products: Obtiene un listado de todos los productos.
GET /api/products/:id: Obtiene un producto específico por su ID.
POST /api/products/create: Crea un nuevo producto (ruta protegida).
PUT /api/products/:id: Actualiza un producto existente por su ID (ruta protegida).
DELETE /api/products/:id: Elimina un producto por su ID (ruta protegida).
Autenticación y Seguridad:
Endpoint POST /api/auth/login que genera un token JWT para simular el inicio de sesión.
Middleware de autenticación que verifica el token en las rutas protegidas (crear, actualizar, eliminar).
Manejo de Errores Centralizado: Un middleware de errores se encarga de capturar todos los errores de forma consistente y enviar una respuesta formateada.
▶️ Cómo Ejecutar el Proyecto
1. Clonar el repositorio:
git clone https://github.com/Da-Bz/Node.JS-Final.git
cd Node.JS-Final
2. Instalar dependencias
npm install
3. Configurar las Variables de Entorno (¡Paso Crucial!)
Para que la API pueda conectarse a tu base de datos de Firebase, necesitas crear dos archivos:

A. Clave de Servicio de Firebase:

Ve a tu Proyecto de Firebase -> Configuración del proyecto (el ícono del engranaje).
Ve a la pestaña "Cuentas de servicio".
Haz clic en el botón "Generar nueva clave privada". Esto descargará un archivo .json.
Renombra ese archivo a serviceAccountKey.json.
Mueve el archivo serviceAccountKey.json a la carpeta /config de tu proyecto.
B. Archivo .env:

Crea un archivo llamado .env en la raíz del proyecto.
Añade la siguiente línea, reemplazando tu_clave_secreta por cualquier frase que desees:
JWT_SECRET=tu_clave_secreta_super_dificil
⚠️ Importante: El archivo .gitignore ya está configurado para ignorar serviceAccountKey.json y .env, por lo que tus claves secretas nunca se subirán a GitHub.

4. Ejecutar el servidor de desarrollo
npm run dev
El servidor se iniciará en http://localhost:3000.

🧪 Cómo Probar la API
Puedes usar una herramienta como Postman o Insomnia para probar los endpoints. El servidor se ejecuta en `http://localhost:3000`.

1️⃣ Registrar un nuevo usuario
- **Método:** `POST`
- **URL:** `/api/auth/register`
- **Body (raw, JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

2️⃣ Iniciar sesión para obtener el Token
- **Método:** `POST`
- **URL:** `/api/auth/login`
- **Body (raw, JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Respuesta:** Copia el `token` que se devuelve en la respuesta.

3️⃣ Crear un producto (Ruta protegida)
- **Método:** `POST`
- **URL:** `/api/products/create`
- **Headers:**
    - `Authorization`: `Bearer TU_TOKEN_AQUI`
- **Body (raw, JSON):**
  ```json
  {
    "nombre": "Laptop Pro",
    "precio": 1200,
    "stock": 15,
    "descripcion": "Una laptop potente para profesionales",
    "categoria": "Electrónica"
  }
  ```

4️⃣ Ver todos los productos (Ruta pública)
- **Método:** `GET`
- **URL:** `/api/products`

5️⃣ Editar un producto (Ruta protegida)
- **Método:** `PUT`
- **URL:** `/api/products/:id` (reemplaza `:id` con el ID de un producto real)
- **Headers:**
    - `Authorization`: `Bearer TU_TOKEN_AQUI`
- **Body (raw, JSON):**
  ```json
  {
    "precio": 1150,
    "stock": 10
  }
  ```

6️⃣ Eliminar un producto (Ruta protegida)
- **Método:** `DELETE`
- **URL:** `/api/products/:id` (reemplaza `:id` con el ID de un producto real)
- **Headers:**
    - `Authorization`: `Bearer TU_TOKEN_AQUI`
