import express from 'express';
const router = express.Router();

import testRouter from './test';
import authRouter from './auth';

router.use('/test', testRouter);
router.use('/auth', authRouter);

export default router;
