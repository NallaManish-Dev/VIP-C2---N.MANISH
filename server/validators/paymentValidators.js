import mongoose from 'mongoose';

const isFutureOrTodayDate = (dateValue) => {
  const date = new Date(dateValue);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(date.getTime()) && date >= today;
};

export const processPaymentValidator = (req) => {
  const { doctorId, appointmentDate, appointmentTime, paymentMethod } = req.body;
  const errors = [];

  const allowedMethods = ['Credit Card', 'Debit Card', 'UPI'];

  if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) errors.push('Valid doctor id is required');
  if (!appointmentDate || !isFutureOrTodayDate(appointmentDate)) errors.push('Appointment date must be today or a future date');
  if (!appointmentTime || !appointmentTime.trim()) errors.push('Appointment time is required');
  if (!paymentMethod || !allowedMethods.includes(paymentMethod)) errors.push('paymentMethod must be Credit Card, Debit Card, or UPI');

  return errors;
};

export const paymentHistoryValidator = () => {
  // No body required for GET /history
  return [];
};

