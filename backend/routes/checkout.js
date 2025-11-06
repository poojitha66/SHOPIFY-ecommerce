import { Router } from 'express';
import { createCheckoutSession } from '../controllers/checkoutController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createCheckoutSession);

export default router;
