import express from 'express';
import taskRoutes from './taskRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Mount all routes
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router;
