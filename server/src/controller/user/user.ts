import { CustomError, errorHandler } from '@utils/error';
import User from '@models/User';
import NicknameLog from '@models/NicknameLog';
import { startSession } from 'mongoose';

const transaction = async (fn) => {
  const session = await startSession();
  session.startTransaction();

  const result = await fn();

  await session.commitTransaction();
  session.endSession();

  return result;
};

export const getUserInformation = async (req, res, next) => {
  const { id } = req.query;
  try {
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
    ];
    const query = selectList.join(' ');
    const user = await User.findOne({ _id: id }).select(query);
    if (!user) throw new CustomError(400, 'id Error');
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getUserNicknameLog = async (req, res, next) => {
  const id = req.user._id;
  try {
    if (!id) throw new CustomError(401, 'id Error');
    const nicknameLog = await NicknameLog.find({ userId: id })
      .sort({ createdAt: 'desc' })
      .select('nickname createdAt')
      .limit(5);

    if (!nicknameLog) throw new CustomError(400, 'id Error');

    res.status(200).json({
      nicknameLog,
      message: 'User Information Update Success',
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const patchUserImage = async (req, res, next) => {
  const image = req.file;
  try {
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
  } catch (error) {
    next(errorHandler(error));
  }
};

export const patchUserNickname = async (req, res, next) => {
  const { nickname } = req.body;
  try {
    if (!nickname) throw new CustomError(400, 'Invalid Data');

    const id = req.user._id;
    if (!id) throw new CustomError(401, 'id Error');

    const result = await transaction(async () => {
      const value = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { nickname } },
        {
          new: true,
        },
      ).exec();

      await new NicknameLog({
        userId: id,
        nickname: nickname,
      }).save();
      return value;
    });

    res.status(200).json({
      nickname: result.nickname,
      message: 'User Information Update Success',
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
