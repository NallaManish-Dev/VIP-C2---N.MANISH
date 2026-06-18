import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const appointmentPopulate = [
  { path: 'patientId', select: 'name email' },
  { path: 'doctorId', select: 'name specialization fees image hospital' }
];

export const bookAppointment = async (patientId, payload) => {
  const doctor = await Doctor.findById(payload.doctorId);

  if (!doctor) throw new AppError('Doctor not found', 404);
  if (!doctor.availability) throw new AppError('Doctor is not available', 400);

  const appointment = await Appointment.create({
    patientId,
    doctorId: payload.doctorId,
    appointmentDate: payload.appointmentDate,
    appointmentTime: payload.appointmentTime,
    notes: payload.notes || ''
  });

  return appointment.populate(appointmentPopulate);
};

export const getPatientAppointments = async (patientId) => {
  return Appointment.find({ patientId }).populate(appointmentPopulate).sort({ appointmentDate: -1 });
};

export const getAllAppointments = async () => {
  return Appointment.find().populate(appointmentPopulate).sort({ createdAt: -1 });
};

export const getAppointmentById = async (id, user) => {
  const appointment = await Appointment.findById(id).populate(appointmentPopulate);

  if (!appointment) throw new AppError('Appointment not found', 404);
  if (user.role !== 'admin' && appointment.patientId._id.toString() !== user._id.toString()) {
    throw new AppError('Access denied', 403);
  }

  return appointment;
};

export const updateAppointmentStatus = async (id, status) => {
  const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).populate(
    appointmentPopulate
  );

  if (!appointment) throw new AppError('Appointment not found', 404);
  return appointment;
};

export const cancelAppointment = async (id, patientId) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) throw new AppError('Appointment not found', 404);
  if (appointment.patientId.toString() !== patientId.toString()) throw new AppError('Access denied', 403);

  appointment.status = 'Cancelled';
  await appointment.save();
  return appointment.populate(appointmentPopulate);
};

export const getDashboardStats = async () => {
  const [totalDoctors, totalPatients, totalAppointments] = await Promise.all([
    Doctor.countDocuments(),
    User.countDocuments({ role: 'patient' }),
    Appointment.countDocuments()
  ]);

  return { totalDoctors, totalPatients, totalAppointments };
};


