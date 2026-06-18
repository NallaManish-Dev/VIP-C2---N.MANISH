import { getDashboardStats } from '../services/appointmentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats();
  sendSuccess(res, 200, 'Dashboard statistics fetched successfully', stats);
});
