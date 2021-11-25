import { CustomError, errorWrapper } from '@utils/error';
import User from '@models/User';
import { userCount } from '@utils/userCount';
import NicknameLog from '@models/NicknameLog';
import { BACK_BASE_URL } from '@src/constant';
import { FILE_PUBLIC_URL, DEFAULT_PROFILE_IMAGE } from 'sooltreaming-domain/constant/addition';

export const getUserInformation = errorWrapper(async (req, res, next) => {
  const { id } = req.query;
  if (!id) throw new CustomError(400, 'id Error');

  const query = [...userCount, 'createdAt -_id'].join(' ');

  const information = await User.findOne({ _id: id }).select(query).exec();

  const nicknameLog = await NicknameLog.find({ userId: id })
    .sort({ createdAt: 'desc' })
    .select('nickname -_id');

  if (!information) throw new CustomError(400, 'id Error');
  res.status(200).json({
    information,
    nicknameLog,
  });
});

export const getUserNicknameLog = errorWrapper(async (req, res, next) => {
  const id = req.user._id;
  if (!id) throw new CustomError(401, 'id Error');
  const nicknameLog = await NicknameLog.find({ userId: id })
    .sort({ createdAt: 'desc' })
    .select('nickname -_id');

  if (!nicknameLog) throw new CustomError(400, 'id Error');

  res.status(200).json({
    nicknameLog,
    message: 'User Information Update Success',
  });
});

export const patchUserImage = errorWrapper(async (req, res, next) => {
  const image = req.file;
  if (!image) throw new CustomError(400, 'Invalid Data');
  const id = req.user._id;
  if (!id) throw new CustomError(401, 'id Error');
  const imgUrl = image.path;

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { imgUrl } },
    {
      new: true,
    },
  ).exec();

  res.status(200).json({
    imgUrl: result.imgUrl,
    message: 'User Information Update Success',
  });
});

export const patchUserNickname = errorWrapper(async (req, res, next) => {
  const { nickname } = req.body;
  if (!nickname) throw new CustomError(400, 'Invalid Data');

  const { _id } = JSON.parse(JSON.stringify(req.user));
  if (!_id) throw new CustomError(401, 'id Error');

  const user = await User.updateOne({ _id }, { $set: { nickname } });
  if (!user) throw new CustomError(400, 'id Error');

  await new NicknameLog({
    userId: _id,
    nickname: nickname,
  }).save();

  res.status(200).json({
    message: 'User Information Update Success',
  });
});

export const patchTotalSeconds = errorWrapper(async (req, res, next) => {
  const _id = req.user._id;
  const { startTime } = req.session;
  const { exitTime } = req.body;
  if (!_id || !startTime || !exitTime) res.status(400).json({ message: 'invaild data' });
  const result = await User.findOneAndUpdate(
    { _id },
    { $inc: { totalSeconds: Math.floor((exitTime - startTime) / 1000) } },
  );
  req.session.startTime = new Date().getTime();
  res.status(200).json({ message: 'success!' });
});

export const postUserImage = errorWrapper(async (req, res, next) => {
  const id = req.user._id;
  if (!id) throw new CustomError(401, 'id Error');
  let image = req.file;
  if (!image) {
    image = `${BACK_BASE_URL}${FILE_PUBLIC_URL}/${DEFAULT_PROFILE_IMAGE}`;
  } else {
    image = `${BACK_BASE_URL}${FILE_PUBLIC_URL}/` + image.filename;
  }

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { imgUrl: image } },
    {
      new: true,
    },
  ).exec();

  res.status(200).json({
    imgUrl: result.imgUrl,
    message: 'User Information Update Success',
  });
});
