import api from './api.js';

export const getAdminDashboard = () => api.get('/dashboard/admin');
