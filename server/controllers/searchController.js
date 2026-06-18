import { getDoctors } from '../services/doctorService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const searchDoctors = asyncHandler(async (req, res) => {
  const doctors = await getDoctors(req.query);
  sendSuccess(res, 200, 'Doctors fetched successfully', doctors);
});
