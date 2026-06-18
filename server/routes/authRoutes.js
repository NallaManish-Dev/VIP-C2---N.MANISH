import express from 'express';
import { login, profile, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { loginValidator, registerValidator } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', validateRequest(registerValidator), register);
router.post('/login', validateRequest(loginValidator), login);
router.get('/profile', protect, profile);

export default router;
