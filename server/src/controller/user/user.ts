import { CustomError, errorHandler } from '@utils/error';
import User from '@models/User';
import NicknameLog from '@models/NicknameLog';
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
  const id = req.user._id || '618bf4a7e80ad781c6ae8bdd';
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

