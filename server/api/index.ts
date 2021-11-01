import express from 'express';

const router = express.Router();
import v1Router from './v1';

router.use('/v1', v1Router);

router.use(function (err: any, req: any, res: any, next: any) {
  const { status, message } = err;
  if (!status && !message) next();
  res.status(status).json({ error: message });
});

export default router;
