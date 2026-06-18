import express from 'express';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { processPaymentValidator, paymentHistoryValidator } from '../validators/paymentValidators.js';
import { processPayment, getPaymentHistory } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/process', protect, authorize('patient'), validateRequest(processPaymentValidator), processPayment);
router.get('/history', protect, authorize('patient'), validateRequest(paymentHistoryValidator), getPaymentHistory);

export default router;

