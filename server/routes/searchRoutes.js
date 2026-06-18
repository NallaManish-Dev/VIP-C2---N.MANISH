import express from 'express';
import { searchDoctors } from '../controllers/searchController.js';

const router = express.Router();

router.get('/doctors', searchDoctors);

export default router;
