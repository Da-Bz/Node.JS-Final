import admin from '../config/firebase.config.js';
import AppError from '../utils/AppError.js';
import { ProductModel } from '../models/product.model.js';

const db = admin.firestore();
const productsCollection = db.collection('productos');

// Obtener todos los productos
export const getAllProducts = async () => {
  const snapshot = await productsCollection.get();

  if (snapshot.empty) return [];

  return snapshot.docs.map(doc => new ProductModel({
    id: doc.id,
    ...doc.data()
  }));
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const docRef = productsCollection.doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new AppError('Product not found', 404);
  }

  return new ProductModel({ id: docSnap.id, ...docSnap.data() });
};

// Crear un producto
export const createProduct = async (productData) => {
  const { nombre, precio, stock, descripcion, categoria } = productData;

  if (!nombre || !precio || !stock || !descripcion || !categoria) {
    throw new AppError('Missing required product fields', 400);
  }

  const newDoc = await productsCollection.add({
    nombre,
    precio: Number(precio),
    stock: Number(stock),
    descripcion,
    categoria
  });

  return newDoc.id;
};

// Actualizar producto
export const updateProduct = async (id, updateData) => {
  const docRef = productsCollection.doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new AppError('Product not found to update', 404);
  }

  await docRef.update(updateData);
};

// Eliminar producto
export const deleteProduct = async (id) => {
  await productsCollection.doc(id).delete();
};
