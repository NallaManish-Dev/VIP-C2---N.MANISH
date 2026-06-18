import api from './api.js';

export const processPayment = (payload) => api.post('/payments/process', payload);
export const getPaymentHistory = () => api.get('/payments/history');

