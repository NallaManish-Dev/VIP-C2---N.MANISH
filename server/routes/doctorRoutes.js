import express from 'express';
import { addDoctor, editDoctor, getAllDoctors, getDoctor, removeDoctor } from '../controllers/doctorController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { uploadDoctorImage } from '../middleware/uploadMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { doctorValidator } from '../validators/doctorValidators.js';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctor);
router.post('/', protect, authorize('admin'), uploadDoctorImage, validateRequest(doctorValidator), addDoctor);
router.put('/:id', protect, authorize('admin'), uploadDoctorImage, validateRequest(doctorValidator), editDoctor);
router.delete('/:id', protect, authorize('admin'), removeDoctor);

export default router;
