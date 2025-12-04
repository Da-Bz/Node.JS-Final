import admin from '../config/firebase.config.js';
import AppError from "../utils/AppError.js";

// Modelo para obtener todos los productos de Firestore
export const getAll = async () => {
    try {
        const db = admin.firestore();
        const productsCollection = db.collection("products");
        const snapshot = await productsCollection.get();
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products;
    } catch (error) {
        throw new AppError('No se pudieron obtener los productos de la base de datos.', 500);
    }
};

// Modelo para obtener un solo producto por su ID
export const getById = async (id) => {
    try {
        const db = admin.firestore();
        const productsCollection = db.collection("products");
        const doc = await productsCollection.doc(id).get();

        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        } else {
            return null;
        }
    } catch (error) {
        throw new AppError('Error al obtener el producto de la base de datos.', 500);
    }
};

// Modelo para crear un nuevo producto en Firestore
export const create = async (productData) => {
    try {
        const db = admin.firestore();
        const productsCollection = db.collection("products");
        const docRef = await productsCollection.add(productData);
        return { id: docRef.id, ...productData };
    } catch (error) {
        throw new AppError('No se pudo crear el producto en la base de datos.', 500);
    }
};

// Modelo para eliminar un producto por su ID
export const remove = async (id) => {
    try {
        const db = admin.firestore();
        const productsCollection = db.collection("products");
        const docRef = productsCollection.doc(id);
        
        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }
        
        await docRef.delete();
        return { id };
    } catch (error) {
        throw new AppError('No se pudo eliminar el producto de la base de datos.', 500);
    }
};
