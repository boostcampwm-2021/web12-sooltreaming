import express from 'express';
const router = express.Router();

import testRouter from './test';

router.use('/test', testRouter);

export default router;
