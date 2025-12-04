import * as ProductModel from '../models/product.model.js';
import AppError from '../utils/AppError.js';

// Servicio para obtener todos los productos
export const getAllProducts = async () => {
    // Llama directamente a la función del modelo y devuelve el resultado
    return await ProductModel.getAll();
};

// Servicio para obtener un solo producto por ID
export const getProductById = async (id) => {
    const product = await ProductModel.getById(id);
    if (!product) {
        // Si no se encuentra ningún producto, lanza un error específico para el controlador
        throw new AppError('Producto no encontrado', 404);
    }
    return product;
};

// Servicio para crear un nuevo producto
export const createProduct = async (productData) => {
    // Aquí podrías agregar una lógica de negocio más compleja si fuera necesario
    // Por ahora, solo validamos que tenemos los campos requeridos
    const { name, description, price, stock } = productData;
    if (!name || !description || price === undefined || stock === undefined) {
        throw new AppError('Faltan campos obligatorios: nombre, descripción, precio, stock', 400);
    }

    return await ProductModel.create({ name, description, price, stock });
};

// Servicio para eliminar un producto
export const deleteProduct = async (id) => {
    const result = await ProductModel.remove(id);
    if (!result) {
        // Si el modelo devuelve nulo, significa que el producto no existía
        throw new AppError('Producto no encontrado', 404);
    }
    return result;
};
