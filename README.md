# API REST para E-commerce con Node.JS y Firebase 🔥

Este proyecto es el backend para una tienda online, desarrollado como proyecto final para la cursada de Node.JS en Talento Tech.

#### Alumno: BLANEZ, Damian

---

## 🚀 Tecnologías Utilizadas

Se utilizaron las siguientes tecnologías y herramientas para construir esta API:

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express.js**: Framework para la construcción de la API, manejo de rutas y middlewares.
- **Firebase Admin SDK**: Para la conexión segura y la interacción con los servicios de Firebase desde el servidor.
- **Cloud Firestore**: Base de datos NoSQL en la nube para el almacenamiento y gestión de los productos.
- **JSON Web Token (JWT)**: Para la protección de rutas mediante tokens de autenticación.
- **Jest & Supertest**: Para la creación y ejecución de una suite de tests de integración que comprueban cada endpoint.
- **Dotenv**: Para el manejo de variables de entorno y protección de claves secretas.
- **ES Modules**: Uso de la sintaxis moderna de `import`/`export` en todo el proyecto.

---

## 🔧 Características del Proyecto

- **Arquitectura Modular**: El código está organizado en `rutas`, `controladores` y `middlewares` para una mejor mantenibilidad.
- **Endpoints CRUD para Productos**:
    - `GET /api/products`: Obtiene un listado de todos los productos.
    - `GET /api/products/:id`: Obtiene un producto específico por su ID.
    - `POST /api/products/create`: Crea un nuevo producto (ruta protegida).
    - `PUT /api/products/:id`: Actualiza un producto existente por su ID (ruta protegida).
    - `DELETE /api/products/:id`: Elimina un producto por su ID (ruta protegida).
- **Autenticación y Seguridad**:
    - Endpoint `POST /api/auth/login` que genera un token JWT para simular el inicio de sesión.
    - Middleware de autenticación que verifica el token en las rutas protegidas (crear, actualizar, eliminar).
- **Manejo de Errores Centralizado**: Un middleware de errores se encarga de capturar todos los errores de forma consistente y enviar una respuesta formateada.
- **Suite de Pruebas Completa**: Se incluyen tests para cada endpoint, validando el funcionamiento correcto, los casos de éxito y los errores esperados (ej. producto no encontrado).

## ▶️ Cómo Ejecutar el Proyecto

#### 1. Clonar el repositorio:

```sh
git clone https://github.com/Da-Bz/Node.JS-Final.git
cd Node.JS-Final
```

#### 2. Instalar dependencias

```sh
npm install
```

#### 3. Configurar las Variables de Entorno (¡Paso Crucial!)

Para que la API pueda conectarse a tu base de datos de Firebase, necesitas crear dos archivos:

**A. Clave de Servicio de Firebase:**

1.  Ve a tu **Proyecto de Firebase** -> **Configuración del proyecto** (el ícono del engranaje).
2.  Ve a la pestaña **"Cuentas de servicio"**.
3.  Haz clic en el botón **"Generar nueva clave privada"**. Esto descargará un archivo `.json`.
4.  Renombra ese archivo a `serviceAccountKey.json`.
5.  Mueve el archivo `serviceAccountKey.json` a la carpeta `/config` de tu proyecto.

**B. Archivo `.env`:**

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Añade la siguiente línea, reemplazando `tu_clave_secreta` por cualquier frase que desees:

```
JWT_SECRET=tu_clave_secreta_super_dificil
```

> ⚠️ **Importante:** El archivo `.gitignore` ya está configurado para ignorar `serviceAccountKey.json` y `.env`, por lo que tus claves secretas nunca se subirán a GitHub.

#### 4. Ejecutar el servidor de desarrollo

```sh
npm run dev
```
El servidor se iniciará en `http://localhost:3000`.

#### 5. Ejecutar los tests

Para verificar que toda la configuración es correcta y que los endpoints funcionan como se espera:

```sh
npm test
```
