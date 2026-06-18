import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor
} from '../services/doctorService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await getDoctors(req.query);
  sendSuccess(res, 200, 'Doctors fetched successfully', doctors);
});

export const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await getDoctorById(req.params.id);
  sendSuccess(res, 200, 'Doctor fetched successfully', doctor);
});

export const addDoctor = asyncHandler(async (req, res) => {
  const doctor = await createDoctor(req.body, req.file);
  sendSuccess(res, 201, 'Doctor added successfully', doctor);
});

export const editDoctor = asyncHandler(async (req, res) => {
  const doctor = await updateDoctor(req.params.id, req.body, req.file);
  sendSuccess(res, 200, 'Doctor updated successfully', doctor);
});

export const removeDoctor = asyncHandler(async (req, res) => {
  await deleteDoctor(req.params.id);
  sendSuccess(res, 200, 'Doctor deleted successfully');
});
