import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { 
    getProducts, 
    getProduct, 
    createNewProduct, 
    updateProductById, 
    deleteProductById 
} from '../controllers/products.controller.js';

const router = Router();

// --- Rutas Públicas --- Cualquiera puede ver los productos
router.get('/', getProducts);
router.get('/:id', getProduct);

// --- Rutas Protegidas --- Solo los usuarios autenticados pueden crear, actualizar y eliminar
router.post('/crear', authMiddleware, createNewProduct);
router.put('/:id', authMiddleware, updateProductById);
router.delete('/:id', authMiddleware, deleteProductById);

export default router;