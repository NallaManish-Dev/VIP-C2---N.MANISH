import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { processFakePayment, getPatientPaymentHistory } from '../services/paymentService.js';

export const processPayment = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate, appointmentTime, paymentMethod } = req.body;

  const result = await processFakePayment({
    userId: req.user._id,
    doctorId,
    appointmentDate,
    appointmentTime,
    paymentMethod
  });

  sendSuccess(res, 200, 'Payment Successful', {
    success: true,
    transactionId: result.transactionId,
    message: 'Payment Successful'
  });
});

export const getPaymentHistory = asyncHandler(async (req, res) => {
  const payments = await getPatientPaymentHistory(req.user._id);
  sendSuccess(res, 200, 'Payment history fetched successfully', payments);
});

