import express from 'express';
import {
  getUserInformation,
  getUserNicknameLog,
  postUserImage,
  patchUserNickname,
  patchTotalSeconds,
} from '@controller/user';

import multer from 'multer';

/*
const storage = multer.memoryStorage();
const upload = multer({ storage });
*/

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
router.post('/image', upload.single('image'), postUserImage);
router.patch('/nickname', patchUserNickname);
router.patch('/exit', patchTotalSeconds);

export default router;
