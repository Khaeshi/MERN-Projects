import express from 'express';
import authRoutes from './auth.js';
import menuRoutes from './menu.js';
import adminRoutes from  './admin.js';

const router = express.Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/admin', adminRoutes);

export default router;