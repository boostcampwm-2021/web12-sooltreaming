import express from 'express';
import {
  getUserInformation,
  getUserNicknameLog,
} from '@controller/user/user';
const router = express.Router();

router.get('/', getUserInformation);
router.get('/nickname', getUserNicknameLog);

export default router;
