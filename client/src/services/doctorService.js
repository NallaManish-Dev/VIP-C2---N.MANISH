import api from './api.js';

export const getDoctors = (params) => api.get('/doctors', { params });
export const searchDoctors = (params) => api.get('/search/doctors', { params });
export const getDoctor = (id) => api.get(`/doctors/${id}`);
export const createDoctor = (payload) =>
  api.post('/doctors', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateDoctor = (id, payload) =>
  api.put(`/doctors/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);
