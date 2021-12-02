import User from '@models/User';
import NicknameLog from '@models/NicknameLog';
import { userCount } from '@utils/userCount';
import { LOG_EVENT, ERROR } from '@src/constant';
import { DEFAULT_PROFILE_IMAGE_URL } from 'sooltreaming-domain/constant/addition';
import { CustomError } from '@utils/error';
import { NCP_ACCESS_KEY, NCP_SECRET_KEY, NCP_REGION } from '@src/constant';
import { NCP_ENDPOINT, NCP_BUCKET } from 'sooltreaming-domain/constant/addition';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

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

export const upload = multer({
  storage: storage,
});

export const createLog = async (
  _id: string,
  eventType: string,
  value: number = 1,
): Promise<void> => {
  await User.updateOne({ _id }, { $inc: { [LOG_EVENT[eventType]]: value } });
};

export const getUserInfoService = async (_id) => {
  const query = [...userCount, 'createdAt -_id'].join(' ');
  const information = await User.findOne({ _id }).select(query).exec();
  const nicknameLog = await NicknameLog.find({ userId: _id })
    .sort({ createdAt: 'desc' })
    .select('nickname -_id');
  return { information, nicknameLog };
};

export const updateNickname = async (_id, nickname) => {
  const user = await User.updateOne({ _id }, { $set: { nickname } });
  if (!user) throw new CustomError(400, ERROR.NOT_EXIST_USER);

  await new NicknameLog({
    userId: _id,
    nickname: nickname,
  }).save();
};

export const updateUserImage = async (_id, image) => {
  if (!image) {
    image = DEFAULT_PROFILE_IMAGE_URL;
  } else {
    image = image.location;
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { $set: { imgUrl: image } },
    {
      new: true,
    },
  ).exec();

  return result.imgUrl;
};

export const updateTotalSeconds = async (_id, startTime, exitTime) => {
  const value = Math.floor((exitTime - startTime) / 1000);
  await createLog(_id, 'EXIT', value);
};
