import express from 'express';
import {
  getUserInformation,
  getUserNicknameLog,
  patchUserImage,
  patchUserNickname,
} from '@controller/user/user';

import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
  }),
});

const router = express.Router();

router.get('/', getUserInformation);
router.get('/nickname', getUserNicknameLog);
router.patch('/image', upload.single('image'), patchUserImage);
router.patch('/nickname', patchUserNickname);

export default router;
