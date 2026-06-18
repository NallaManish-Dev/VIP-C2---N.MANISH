import mongoose from 'mongoose';

const isFutureDate = (dateValue) => {
  const date = new Date(dateValue);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(date.getTime()) && date >= today;
};

export const bookAppointmentValidator = (req) => {
  const { doctorId, appointmentDate, appointmentTime } = req.body;
  const errors = [];

  if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) errors.push('Valid doctor id is required');
  if (!appointmentDate || !isFutureDate(appointmentDate)) errors.push('Appointment date must be today or a future date');
  if (!appointmentTime || !appointmentTime.trim()) errors.push('Appointment time is required');

  return errors;
};

export const statusValidator = (req) => {
  const allowedStatuses = ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];
  const errors = [];

  if (!allowedStatuses.includes(req.body.status)) {
    errors.push('Status must be Pending, Approved, Rejected, Completed, or Cancelled');
  }

  return errors;
};
