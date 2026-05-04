import express from 'express';
import { register, login } from '../controllers/authController';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Products
router.get('/products', getProducts);
router.post('/products', authenticate, authorize(['ADMIN']), createProduct);
router.put('/products/:id', authenticate, authorize(['ADMIN']), updateProduct);
router.delete('/products/:id', authenticate, authorize(['ADMIN']), deleteProduct);

// Orders
router.post('/orders', authenticate, authorize(['CUSTOMER']), createOrder);
router.get('/orders', authenticate, getOrders);
router.put('/orders/:id', authenticate, authorize(['ADMIN', 'DELIVERY']), updateOrderStatus);

export default router;
