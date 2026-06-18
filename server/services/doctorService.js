import Doctor from '../models/Doctor.js';
import AppError from '../utils/AppError.js';

const buildDoctorPayload = (body, imagePath) => ({
  name: body.name,
  specialization: body.specialization,
  qualification: body.qualification,
  experience: Number(body.experience),
  fees: Number(body.fees),
  availability: body.availability === undefined ? true : body.availability === 'true' || body.availability === true,
  about: body.about || '',
  hospital: body.hospital || '',
  ...(imagePath ? { image: imagePath } : {})
});

export const getDoctors = async (filters = {}) => {
  const query = {};

  if (filters.name) query.name = { $regex: filters.name, $options: 'i' };
  if (filters.specialization) query.specialization = { $regex: filters.specialization, $options: 'i' };

  return Doctor.find(query).sort({ createdAt: -1 });
};

export const getDoctorById = async (id) => {
  const doctor = await Doctor.findById(id);
  if (!doctor) throw new AppError('Doctor not found', 404);
  return doctor;
};

export const createDoctor = async (body, file) => {
  const imagePath = file ? `/uploads/${file.filename}` : '';
  return Doctor.create(buildDoctorPayload(body, imagePath));
};

export const updateDoctor = async (id, body, file) => {
  const imagePath = file ? `/uploads/${file.filename}` : undefined;
  const doctor = await Doctor.findByIdAndUpdate(id, buildDoctorPayload(body, imagePath), {
    new: true,
    runValidators: true
  });

  if (!doctor) throw new AppError('Doctor not found', 404);
  return doctor;
};

export const deleteDoctor = async (id) => {
  const doctor = await Doctor.findByIdAndDelete(id);
  if (!doctor) throw new AppError('Doctor not found', 404);
  return doctor;
};
