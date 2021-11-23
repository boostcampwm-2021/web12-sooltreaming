import express from 'express';
const router = express.Router();

import testRouter from './test';
import authRouter from './auth';
import userRouter from './user';
import friendRouter from './friend';
import rankRouter from './rank';

router.use('/user', userRouter);
router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/friend', friendRouter);
router.use('/rank', rankRouter);
export default router;
