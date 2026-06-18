import crypto from 'crypto';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import AppError from '../utils/AppError.js';
import { sleep } from '../utils/sleep.js';

const generateTransactionId = () => {
  const suffix = crypto.randomInt(100000, 999999);
  const year = new Date().getFullYear();
  return `TXN-${year}-${suffix}`;
};

export const processFakePayment = async ({ userId, doctorId, appointmentDate, appointmentTime, paymentMethod }) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new AppError('Doctor not found', 404);
  if (!doctor.availability) throw new AppError('Doctor is not available', 400);

  // Fake 2-second processing animation/delay
  await sleep(2000);

  const transactionId = generateTransactionId();

  const appointment = await Appointment.create({
    patientId: userId,
    doctorId,
    appointmentDate,
    appointmentTime,
    notes: '',
    status: 'Pending',
    paymentStatus: 'Success',
    paymentMethod,
    transactionId,
    paymentDate: new Date()
  });

  return {
    appointment,
    transactionId
  };
};

export const getPatientPaymentHistory = async (patientId) => {
  return Appointment.find({
    patientId,
    $or: [
      { paymentStatus: { $in: ['Success', 'Failed'] } },
      { transactionId: { $exists: true, $ne: '' } }
    ]
  }).sort({ createdAt: -1 });
};

