import * as productService from '../services/product.service.js';
import AppError from '../utils/AppError.js';

// Nombres de los controladores alineados con las rutas para mayor claridad
export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(); // Llamada a la función actualizada
    res.json({ success: true, data: products });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id); // Llamada a la función actualizada
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createNewProduct = async (req, res, next) => {
  try {
    const newProductId = await productService.createProduct(req.body); // Llamada a la función actualizada
    res.status(201).json({ success: true, message: 'Producto creado exitosamente', productId: newProductId });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
    try {
        await productService.updateProduct(req.params.id, req.body); // Llamada a la función actualizada
        res.status(200).json({ success: true, message: 'Producto actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const deleteProductById = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id); // Llamada a la función actualizada
    res.status(200).json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
