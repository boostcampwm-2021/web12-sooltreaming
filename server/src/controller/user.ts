import { CustomError, errorWrapper } from '@utils/error';
import User from '@models/User';
import NicknameLog from '@models/NicknameLog';

export const getUserInformation = errorWrapper(async (req, res, next) => {
  const { id } = req.query;
  if (!id) throw new CustomError(400, 'id Error');
  const selectList = [
    'createdAt',
    'chatCount',
    'hookCount',
    'pollCount',
    'closeupCount',
    'dieCount',
    'speakCount',
    'starterCount',
    'totalSeconds',
    'nicknameLog',
    '-_id',
  ];

  const query = selectList.join(' ');
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

export const postUserImage = errorWrapper(async (req, res, next) => {
  const id = req.user._id;
  if (!id) throw new CustomError(401, 'id Error');
  let image = req.file;
  if (!image) {
    image = 'http://localhost:5000/public/uploads/HumanIcon.svg';
  } else {
    image = 'http://localhost:5000/public/uploads/' + image.filename;
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
