import {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentById,
  getPatientAppointments,
  updateAppointmentStatus
} from '../services/appointmentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await bookAppointment(req.user._id, req.body);
  sendSuccess(res, 201, 'Appointment booked successfully', appointment);
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await getPatientAppointments(req.user._id);
  sendSuccess(res, 200, 'Appointments fetched successfully', appointments);
});

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await getAllAppointments();
  sendSuccess(res, 200, 'Appointments fetched successfully', appointments);
});

export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await getAppointmentById(req.params.id, req.user);
  sendSuccess(res, 200, 'Appointment fetched successfully', appointment);
});

export const updateStatus = asyncHandler(async (req, res) => {
  const appointment = await updateAppointmentStatus(req.params.id, req.body.status);
  sendSuccess(res, 200, 'Appointment status updated', appointment);
});

export const cancelMyAppointment = asyncHandler(async (req, res) => {
  const appointment = await cancelAppointment(req.params.id, req.user._id);
  sendSuccess(res, 200, 'Appointment cancelled successfully', appointment);
});
