import express from 'express';
import { getRank } from '@controller/rank';
const router = express.Router();

router.get('/:type', getRank);

export default router;
