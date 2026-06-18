import express from 'express';
import {
  cancelMyAppointment,
  createAppointment,
  getAppointment,
  getAppointments,
  getMyAppointments,
  updateStatus
} from '../controllers/appointmentController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { bookAppointmentValidator, statusValidator } from '../validators/appointmentValidators.js';

const router = express.Router();

router.post('/', protect, authorize('patient'), validateRequest(bookAppointmentValidator), createAppointment);
router.get('/my', protect, authorize('patient'), getMyAppointments);
router.get('/', protect, authorize('admin'), getAppointments);
router.get('/:id', protect, getAppointment);
router.put('/:id/status', protect, authorize('admin'), validateRequest(statusValidator), updateStatus);
router.delete('/:id', protect, authorize('patient'), cancelMyAppointment);

export default router;
