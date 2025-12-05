import { db } from '../config/firebase.config.js';
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ProductModel } from '../models/product.model.js';
import AppError from '../utils/AppError.js';

// Usando el nombre de la colección del ejemplo de tu profesor
const productsCollection = collection(db, 'productos');

// Función renombrada para coincidir con el ejemplo del profesor
export const getAllProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  if (querySnapshot.empty) {
    return [];
  }
  return querySnapshot.docs.map(doc => new ProductModel({ id: doc.id, ...doc.data() }));
};

// Función renombrada
export const getProductById = async (id) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new AppError('Producto no encontrado', 404); // Se mantuvo el manejo de errores robusto
  }

  return new ProductModel({ id: docSnap.id, ...docSnap.data() });
};

// Función renombrada y se agregó conversión explícita a Número
export const createProduct = async (productData) => {
  const { nombre, precio, stock, descripcion, categoria } = productData;
  if (!nombre || !precio || !stock || !descripcion || !categoria) {
      throw new AppError('Faltan campos obligatorios del producto', 400);
  }

  const productToSave = {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      descripcion,
      categoria
  }

  const docRef = await addDoc(productsCollection, productToSave);
  return docRef.id;
};

// Función renombrada
export const updateProduct = async (id, updateData) => {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new AppError('Producto no encontrado para actualizar', 404);
    }

    await updateDoc(docRef, updateData);
};

// Función renombrada
export const deleteProduct = async (id) => {
  const docRef = doc(db, 'productos', id);
  // Podemos verificar si existe antes de eliminar, pero Firestore no arroja error si no existe.
  // Por simplicidad y eficiencia, podemos simplemente llamar a delete.
  await deleteDoc(docRef);
};
