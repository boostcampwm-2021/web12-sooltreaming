import express from 'express';
import { getUserInformation, postUserImage, patchUserNickname } from '@controller/user';
import { upload } from '@service/user';

const router = express.Router();

router.get('/', getUserInformation);
router.post('/image', upload.single('image'), postUserImage);
router.patch('/nickname', patchUserNickname);

export default router;
