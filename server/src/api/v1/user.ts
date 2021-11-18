import express from 'express';
const router = express.Router();

router.get('/', getUserInformation);

export default router;
