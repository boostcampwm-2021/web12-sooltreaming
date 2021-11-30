import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import {
  getUserInformation,
  postUserImage,
  patchUserNickname,
  patchTotalSeconds,
} from '@controller/user';

import { NCP_ACCESS_KEY, NCP_SECRET_KEY, NCP_REGION } from '@src/constant';
import { NCP_ENDPOINT, NCP_BUCKET } from 'sooltreaming-domain/constant/addition';

const S3 = new AWS.S3({
  endpoint: NCP_ENDPOINT,
  region: NCP_REGION,
  credentials: {
    accessKeyId: NCP_ACCESS_KEY,
    secretAccessKey: NCP_SECRET_KEY,
  },
});

const storage = multerS3({
  s3: S3,
  bucket: NCP_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `uploads/${Date.now()}__${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

router.get('/', getUserInformation);
router.post('/image', upload.single('image'), postUserImage);
router.patch('/nickname', patchUserNickname);
router.patch('/exit', patchTotalSeconds);

export default router;
