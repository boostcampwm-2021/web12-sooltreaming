import express from 'express';
const router = express.Router();

import testRouter from './test';
import authRouter from './auth';
import userRouter from './user';
import friendRouter from './friend';

router.use('/user', userRouter);
router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/friend', friendRouter);

export default router;
