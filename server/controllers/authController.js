import { loginUser, registerUser } from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);
  sendSuccess(res, 201, 'User registered successfully', data);
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  sendSuccess(res, 200, 'Login successful', data);
});

export const profile = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched successfully', {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});
