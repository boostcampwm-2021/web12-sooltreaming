import { CustomError, errorHandler } from '@utils/error';
import User from '@models/User';
import NicknameLog from '@models/NicknameLog';
import { transaction } from '@src/utils/transaction';

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
      'nicknameLog',
      '-_id',
    ];
    

    const query = selectList.join(' ');
    const user = await User.findOne({ _id: id })
    .select(query)
    .populate('nicknameLog', 'nickname -_id')
    .sort({ createdAt: 'desc' })
    .exec();

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
      .select('nickname -_id');

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

      const newNickname = await new NicknameLog({
        userId: id,
        nickname: nickname,
      }).save();

      const value = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { nickname }, $addToSet: {nicknameLog: newNickname._id} },
        {
          new: true,
        },
      ).exec();

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
