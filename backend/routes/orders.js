import { Router } from 'express';
import { createOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createOrder);

export default router;
