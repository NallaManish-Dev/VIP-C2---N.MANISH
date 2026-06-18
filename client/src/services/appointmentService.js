import api from './api.js';

export const bookAppointment = (payload) => api.post('/appointments', payload);
export const getMyAppointments = () => api.get('/appointments/my');
export const getAllAppointments = () => api.get('/appointments');
export const getAppointment = (id) => api.get(`/appointments/${id}`);
export const updateAppointmentStatus = (id, status) => api.put(`/appointments/${id}/status`, { status });
export const cancelAppointment = (id) => api.delete(`/appointments/${id}`);
