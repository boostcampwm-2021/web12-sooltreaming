import { CustomError, errorHandler } from '@utils/error';
import User from '@models/User';
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
