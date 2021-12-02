import express from 'express';
import {
  getUserInformation,
  postUserImage,
  patchUserNickname,
  patchTotalSeconds,
} from '@controller/user';
import { upload } from '@service/user';

const router = express.Router();

router.get('/', getUserInformation);
router.post('/image', upload.single('image'), postUserImage);
router.patch('/nickname', patchUserNickname);
router.patch('/exit', patchTotalSeconds);

export default router;
