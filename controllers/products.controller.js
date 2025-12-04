import * as ProductService from '../services/product.service.js';

// Controlador para obtener todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error); // Pasar el error al manejador de errores centralizado
    }
};

// Controlador para obtener un solo producto por su ID
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

// Controlador para crear un nuevo producto
export const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await ProductService.createProduct(productData);
        // Enviar un código de estado 201 para una creación exitosa
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// Controlador para eliminar un producto por su ID
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        // Enviar un código de estado 204 que indica éxito sin contenido para devolver
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
