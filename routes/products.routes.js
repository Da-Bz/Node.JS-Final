import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
} from '../controllers/products.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// --- Rutas de Productos ---

// GET /api/products - Devuelve todos los productos (Público)
router.get('/', getAllProducts);

// GET /api/products/:id - Devuelve un solo producto por su ID (Público)
router.get('/:id', getProductById);

// POST /api/products - Crea un nuevo producto (Protegido)
router.post('/', protect, createProduct);

// DELETE /api/products/:id - Elimina un producto por su ID (Protegido)
router.delete('/:id', protect, deleteProduct);

export default router;
